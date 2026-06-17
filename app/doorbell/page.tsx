'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

export default function DoorbellPage() {
  const [isProcessing, setIsProcessing] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user' } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setStream(mediaStream);
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
  };

  const handleRing = async () => {
    if (!videoRef.current || isProcessing) return;

    setIsProcessing(true);

    try {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0);
        const imageData = canvas.toDataURL('image/jpeg');

        const response = await fetch('/api/process-image', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            image: imageData, 
            eventType: 'button_press' 
          }),
        });

        const data = await response.json();
        console.log('Processing result:', data);
      }
    } catch (error) {
      console.error('Error processing image:', error);
    } finally {
      setTimeout(() => {
        setIsProcessing(false);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="p-4">
        <Link href="/" className="text-black hover:underline">
          ← Back
        </Link>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="relative w-full max-w-md aspect-video bg-black mb-12">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
        </div>

        <button
          onClick={handleRing}
          disabled={isProcessing}
          className={`w-32 h-32 rounded-full border-4 border-black flex items-center justify-center text-2xl font-bold transition-all ${
            isProcessing 
              ? 'bg-gray-200 cursor-not-allowed' 
              : 'bg-white hover:bg-black hover:text-white'
          }`}
        >
          {isProcessing ? '...' : 'RING'}
        </button>
      </div>
    </div>
  );
}
