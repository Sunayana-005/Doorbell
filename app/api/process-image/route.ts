import { NextRequest, NextResponse } from 'next/server';
import { detectAndRecognizeFace, getKnownFaces } from '@/lib/faceDetection';
import { saveAlert, getSocket } from '@/lib/storage';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { image, eventType } = body;

    if (!image) {
      return NextResponse.json({ success: false, error: 'No image provided' }, { status: 400 });
    }

    const timestamp = new Date().toISOString();

    // Detect faces in the image
    const detectionResult = await detectAndRecognizeFace(image);

    if (!detectionResult.success) {
      return NextResponse.json({
        success: false,
        error: detectionResult.error || 'Face detection failed',
      });
    }

    const facesDetected = detectionResult.facesDetected || 0;

    if (facesDetected === 0) {
      return NextResponse.json({
        success: true,
        facesDetected: 0,
        message: 'No faces detected',
      });
    }

    // Check if face is known
    const knownFaces = await getKnownFaces();
    let isUnknown = true;
    let matchedPerson = null;
    let bestDistance = Infinity;

    if (detectionResult.descriptor) {
      console.log('\n=== Face Recognition ===');
      console.log(`Comparing against ${knownFaces.length} known faces`);
      
      // Compare with all known faces
      for (const knownFace of knownFaces) {
        const distance = calculateEuclideanDistance(
          detectionResult.descriptor,
          knownFace.descriptor
        );
        
        console.log(`  ${knownFace.name}: distance = ${distance.toFixed(4)}`);
        
        // Lower threshold for more strict matching (same image should be ~0)
        if (distance < 0.1 && distance < bestDistance) {
          isUnknown = false;
          matchedPerson = knownFace.name;
          bestDistance = distance;
        }
      }
      
      console.log(`Result: ${isUnknown ? 'UNKNOWN' : `KNOWN (${matchedPerson})`}`);
      console.log('======================\n');
    }

    // Save alert
    const alert = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      imageUrl: image,
      timestamp,
      isUnknown,
      personName: matchedPerson || undefined,
      eventType,
    };

    await saveAlert(alert);

    // Send real-time notification via Socket.IO
    const io = getSocket();
    if (io) {
      if (isUnknown) {
        io.emit('unknown_face_alert', alert);
        console.log('🚨 Sent unknown face alert');
      } else {
        io.emit('known_face_detected', alert);
        console.log(`✓ Known person detected: ${matchedPerson}`);
      }
    }

    return NextResponse.json({
      success: true,
      facesDetected,
      isUnknown,
      personName: matchedPerson,
      matchDistance: bestDistance < Infinity ? bestDistance : null,
      timestamp,
      alert: isUnknown ? 'Alert sent to Indoor Receiver' : 'No alert needed',
    });
  } catch (error) {
    console.error('Error processing image:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

function calculateEuclideanDistance(descriptor1: Float32Array, descriptor2: Float32Array): number {
  let sum = 0;
  for (let i = 0; i < descriptor1.length; i++) {
    const diff = descriptor1[i] - descriptor2[i];
    sum += diff * diff;
  }
  return Math.sqrt(sum);
}
