'use client';

import { useState, useEffect } from 'react';
import io from 'socket.io-client';

interface Alert {
  id: string;
  imageUrl: string;
  timestamp: string;
  isUnknown: boolean;
  personName?: string;
}

export default function IndoorReceiver() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected'>('disconnected');
  const [latestAlert, setLatestAlert] = useState<Alert | null>(null);

  useEffect(() => {
    // Connect to Socket.IO server
    const socket = io();

    socket.on('connect', () => {
      setConnectionStatus('connected');
      console.log('Connected to backend');
    });

    socket.on('disconnect', () => {
      setConnectionStatus('disconnected');
      console.log('Disconnected from backend');
    });

    socket.on('unknown_face_alert', (alert: Alert) => {
      console.log('Received unknown face alert:', alert);
      setAlerts((prev) => [alert, ...prev].slice(0, 10)); // Keep last 10 alerts
      setLatestAlert(alert);
      
      // Play notification sound (optional)
      if (typeof window !== 'undefined') {
        const audio = new Audio('/notification.mp3');
        audio.play().catch(() => console.log('Could not play notification sound'));
      }
    });

    socket.on('known_face_detected', (alert: Alert) => {
      console.log('Known face detected:', alert);
      setAlerts((prev) => [alert, ...prev].slice(0, 10));
    });

    // Fetch existing alerts on mount
    fetchAlerts();

    return () => {
      socket.disconnect();
    };
  }, []);

  const fetchAlerts = async () => {
    try {
      const response = await fetch('/api/alerts');
      const data = await response.json();
      if (data.success) {
        setAlerts(data.alerts);
      }
    } catch (error) {
      console.error('Error fetching alerts:', error);
    }
  };

  const clearAlerts = () => {
    setAlerts([]);
    setLatestAlert(null);
  };

  return (
    <div className="space-y-6">
      {/* Connection Status */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">System Status</h2>
          <div className="flex items-center gap-2">
            <div
              className={`w-3 h-3 rounded-full ${
                connectionStatus === 'connected' ? 'bg-green-500' : 'bg-red-500'
              } animate-pulse`}
            />
            <span className="text-sm font-medium">
              {connectionStatus === 'connected' ? 'Connected' : 'Disconnected'}
            </span>
          </div>
        </div>
      </div>

      {/* Latest Alert - Big Display */}
      {latestAlert && (
        <div className="bg-gradient-to-br from-red-900/30 to-red-800/20 backdrop-blur-sm rounded-xl p-6 border-2 border-red-500/50 shadow-2xl animate-pulse">
          <div className="flex items-start justify-between mb-4">
            <h2 className="text-2xl font-bold text-red-400">⚠️ Unknown Visitor Detected!</h2>
            <button
              onClick={() => setLatestAlert(null)}
              className="text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="relative aspect-video rounded-lg overflow-hidden bg-black">
              <img
                src={latestAlert.imageUrl}
                alt="Latest visitor"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col justify-center space-y-4">
              <p className="text-lg">
                <span className="text-gray-400">Time:</span>{' '}
                <span className="font-semibold">{new Date(latestAlert.timestamp).toLocaleString()}</span>
              </p>
              <p className="text-lg">
                <span className="text-gray-400">Status:</span>{' '}
                <span className="font-semibold text-red-400">Unknown Person</span>
              </p>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors">
                  View Door
                </button>
                <button className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg font-medium transition-colors">
                  Add to Known
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Alert History */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Recent Activity</h2>
          <button
            onClick={clearAlerts}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-medium transition-colors"
          >
            Clear All
          </button>
        </div>

        {alerts.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <p className="text-lg">No recent activity</p>
            <p className="text-sm mt-2">Alerts will appear here when visitors arrive</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className={`rounded-lg overflow-hidden border-2 ${
                  alert.isUnknown
                    ? 'border-red-500/50 bg-red-900/10'
                    : 'border-green-500/50 bg-green-900/10'
                }`}
              >
                <div className="relative aspect-video bg-black">
                  <img
                    src={alert.imageUrl}
                    alt="Visitor"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3 space-y-2">
                  <p className="text-xs text-gray-400">
                    {new Date(alert.timestamp).toLocaleString()}
                  </p>
                  <p className="text-sm font-semibold">
                    {alert.isUnknown ? (
                      <span className="text-red-400">❌ Unknown</span>
                    ) : (
                      <span className="text-green-400">✓ {alert.personName || 'Known'}</span>
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
