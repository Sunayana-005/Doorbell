'use client';

import { useState, useEffect } from 'react';
import IndoorReceiver from '@/components/IndoorReceiver';
import DoorbellCamera from '@/components/DoorbellCamera';
import FaceManager from '@/components/FaceManager';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'receiver' | 'doorbell' | 'manage'>('receiver');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <nav className="bg-black/30 backdrop-blur-sm border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold mb-4">🔔 Smart Doorbell System</h1>
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('receiver')}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                activeTab === 'receiver'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-700/50 hover:bg-gray-700'
              }`}
            >
              📺 Indoor Receiver
            </button>
            <button
              onClick={() => setActiveTab('doorbell')}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                activeTab === 'doorbell'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-700/50 hover:bg-gray-700'
              }`}
            >
              📷 Doorbell Camera
            </button>
            <button
              onClick={() => setActiveTab('manage')}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                activeTab === 'manage'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-700/50 hover:bg-gray-700'
              }`}
            >
              👥 Manage Faces
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'receiver' && <IndoorReceiver />}
        {activeTab === 'doorbell' && <DoorbellCamera />}
        {activeTab === 'manage' && <FaceManager />}
      </main>
    </div>
  );
}
