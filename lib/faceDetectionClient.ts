// Client-side face detection using face-api.js
import * as faceapi from 'face-api.js';

let modelsLoaded = false;

export async function loadFaceDetectionModels() {
  if (modelsLoaded) return true;

  try {
    const MODEL_URL = '/models';
    
    await Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
      faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
      faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
    ]);
    
    modelsLoaded = true;
    console.log('✓ Face detection models loaded');
    return true;
  } catch (error) {
    console.error('Failed to load models:', error);
    return false;
  }
}

export async function detectFaceAndGetDescriptor(imageElement: HTMLImageElement): Promise<Float32Array | null> {
  try {
    const detection = await faceapi
      .detectSingleFace(imageElement, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceDescriptor();

    if (detection) {
      return detection.descriptor;
    }
    return null;
  } catch (error) {
    console.error('Face detection error:', error);
    return null;
  }
}

export function compareDescriptors(descriptor1: Float32Array, descriptor2: Float32Array): number {
  return faceapi.euclideanDistance(descriptor1, descriptor2);
}
