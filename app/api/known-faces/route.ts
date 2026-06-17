import { NextRequest, NextResponse } from 'next/server';
import { addKnownFace, removeKnownFace, getKnownFaces } from '@/lib/storage';
import { detectAndRecognizeFace } from '@/lib/faceDetection';

export async function GET() {
  try {
    const faces = await getKnownFaces();
    
    return NextResponse.json({
      success: true,
      faces: faces.map(f => ({
        id: f.id,
        name: f.name,
        imageUrl: f.imageUrl,
        addedAt: f.addedAt,
      })),
    });
  } catch (error) {
    console.error('Error fetching known faces:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch known faces' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, image } = body;

    if (!name || !image) {
      return NextResponse.json(
        { success: false, error: 'Name and image are required' },
        { status: 400 }
      );
    }

    // Extract face descriptor from the image
    const detectionResult = await detectAndRecognizeFace(image);

    if (!detectionResult.success || !detectionResult.descriptor) {
      return NextResponse.json(
        { success: false, error: 'Could not detect face in image' },
        { status: 400 }
      );
    }

    if (detectionResult.facesDetected === 0) {
      return NextResponse.json(
        { success: false, error: 'No face detected in image' },
        { status: 400 }
      );
    }

    if (detectionResult.facesDetected > 1) {
      return NextResponse.json(
        { success: false, error: 'Multiple faces detected. Please use an image with only one face.' },
        { status: 400 }
      );
    }

    const knownFace = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: name.trim(),
      imageUrl: image,
      descriptor: detectionResult.descriptor,
      addedAt: new Date().toISOString(),
    };

    await addKnownFace(knownFace);

    return NextResponse.json({
      success: true,
      message: 'Person added successfully',
      id: knownFace.id,
    });
  } catch (error) {
    console.error('Error adding known face:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to add person' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'ID is required' },
        { status: 400 }
      );
    }

    await removeKnownFace(id);

    return NextResponse.json({
      success: true,
      message: 'Person removed successfully',
    });
  } catch (error) {
    console.error('Error removing known face:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to remove person' },
      { status: 500 }
    );
  }
}
