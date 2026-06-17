'use client';

import { useState, useRef } from 'react';

export default function DoorbellCamera() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      const imageData = e.target?.result as string;
      setCapturedImage(imageData);
      await processImage(imageData, 'button_press');
    };
    reader.readAsDataURL(file);
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraActive(true);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Could not access camera. Please check permissions.');
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
      setIsCameraActive(false);
    }
  };

  const captureFromCamera = () => {
    if (!videoRef.current) return;

    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0);
      const imageData = canvas.toDataURL('image/jpeg');
      setCapturedImage(imageData);
      processImage(imageData, 'button_press');
      stopCamera();
    }
  };

  const processImage = async (imageData: string, eventType: 'button_press' | 'motion') => {
    setIsProcessing(true);
    setResult(null);

    try {
      const response = await fetch('/api/process-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: imageData, eventType }),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error processing image:', error);
      setResult({ success: false, error: 'Failed to process image' });
    } finally {
      setIsProcessing(false);
    }
  };

  const simulateButtonPress = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
        <h2 className="text-2xl font-bold mb-6">Doorbell Camera Simulator</h2>

        {/* Camera View */}
        <div className="mb-6">
          <div className="relative aspect-video bg-black rounded-lg overflow-hidden mb-4">
            {isCameraActive ? (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
            ) : capturedImage ? (
              <img src={capturedImage} alt="Captured" className="w-full h-full object-cover" />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                <div className="text-center">
                  <p className="text-xl mb-2">📷</p>
                  <p>No image captured</p>
                </div>
              </div>
            )}
          </div>

          {/* Camera Controls */}
          <div className="flex gap-3 flex-wrap">
            {!isCameraActive ? (
              <>
                <button
                  onClick={startCamera}
                  className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-all transform hover:scale-105"
                >
                  📹 Start Camera
                </button>
                <button
                  onClick={simulateButtonPress}
                  className="flex-1 px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-semibold transition-all transform hover:scale-105"
                >
                  🔔 Upload Image (Button Press)
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={captureFromCamera}
                  disabled={isProcessing}
                  className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  📸 Capture & Process
                </button>
                <button
                  onClick={stopCamera}
                  className="px-6 py-3 bg-gray-600 hover:bg-gray-700 rounded-lg font-semibold transition-all"
                >
                  ✕ Cancel
                </button>
              </>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>

        {/* Processing Status */}
        {isProcessing && (
          <div className="bg-blue-900/30 border border-blue-500/50 rounded-lg p-4 text-center">
            <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-2" />
            <p className="text-blue-400 font-medium">Processing image...</p>
          </div>
        )}

        {/* Results */}
        {result && (
          <div
            className={`rounded-lg p-6 border-2 ${
              result.success
                ? result.isUnknown
                  ? 'bg-red-900/20 border-red-500/50'
                  : 'bg-green-900/20 border-green-500/50'
                : 'bg-gray-900/20 border-gray-500/50'
            }`}
          >
            <h3 className="text-xl font-semibold mb-4">
              {result.success ? '✓ Processing Complete' : '✗ Processing Failed'}
            </h3>

            {result.success && (
              <div className="space-y-3">
                <p className="text-lg">
                  <span className="text-gray-400">Faces Detected:</span>{' '}
                  <span className="font-semibold">{result.facesDetected || 0}</span>
                </p>

                {result.facesDetected > 0 && (
                  <>
                    <p className="text-lg">
                      <span className="text-gray-400">Recognition:</span>{' '}
                      {result.isUnknown ? (
                        <span className="font-semibold text-red-400">❌ Unknown Person</span>
                      ) : (
                        <span className="font-semibold text-green-400">
                          ✓ Known Person ({result.personName})
                        </span>
                      )}
                    </p>

                    {result.isUnknown && (
                      <div className="bg-red-900/30 rounded p-4 mt-4">
                        <p className="font-semibold text-red-400">🚨 Alert Sent to Indoor Receiver!</p>
                        <p className="text-sm text-gray-400 mt-1">
                          The homeowner has been notified of an unknown visitor.
                        </p>
                      </div>
                    )}
                  </>
                )}

                {result.facesDetected === 0 && (
                  <p className="text-gray-400">No faces detected in the image.</p>
                )}
              </div>
            )}

            {!result.success && (
              <p className="text-red-400">{result.error || 'Unknown error occurred'}</p>
            )}
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
        <h3 className="text-lg font-semibold mb-3">How It Works</h3>
        <ul className="space-y-2 text-gray-300">
          <li>• 📸 Capture an image using your camera or upload a photo</li>
          <li>• 🤖 AI detects faces in the image</li>
          <li>• 🔍 System compares faces with known persons database</li>
          <li>• 🚨 Unknown faces trigger an alert to the Indoor Receiver</li>
          <li>• ✅ Known faces are logged without alerting</li>
        </ul>
      </div>
    </div>
  );
}
