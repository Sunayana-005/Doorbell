'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import io from 'socket.io-client';

interface Alert {
  id: string;
  imageUrl: string;
  timestamp: string;
  isUnknown: boolean;
  personName?: string;
}

export default function DashboardPage() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [savingId, setSavingId] = useState<string | null>(null);

  useEffect(() => {
    const socket = io();

    socket.on('connect', () => {
      console.log('Connected to backend');
    });

    socket.on('unknown_face_alert', (alert: Alert) => {
      setAlerts((prev) => [alert, ...prev]);
    });

    socket.on('known_face_detected', (alert: Alert) => {
      setAlerts((prev) => [alert, ...prev]);
    });

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

  const handleSavePerson = async (alertItem: Alert) => {
    const name = prompt('Enter person name:');
    if (!name) return;

    setSavingId(alertItem.id);

    try {
      const response = await fetch('/api/known-faces', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name,
          image: alertItem.imageUrl,
        }),
      });

      const data = await response.json();

      if (data.success) {
        window.alert('Person saved successfully!');
        fetchAlerts();
      } else {
        window.alert(`Failed to save person: ${data.error}`);
      }
    } catch (error) {
      console.error('Error saving person:', error);
      window.alert('Failed to save person');
    } finally {
      setSavingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="p-4 border-b border-black">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-black hover:underline">
            ← Back
          </Link>
          <h1 className="text-2xl font-bold text-black">Dashboard</h1>
          <div className="w-16"></div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-8">
        <h2 className="text-xl font-semibold mb-6 text-black">History</h2>

        {alerts.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p>No activity yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {alerts.map((alertItem) => (
              <div
                key={alertItem.id}
                className="border-2 border-black"
              >
                <div className="aspect-square bg-gray-100">
                  <img
                    src={alertItem.imageUrl}
                    alt="Visitor"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 space-y-2">
                  <p className="text-sm text-gray-600">
                    {new Date(alertItem.timestamp).toLocaleString()}
                  </p>
                  
                  {alertItem.isUnknown ? (
                    <>
                      <p className="font-semibold text-black">Unknown Person</p>
                      <button
                        onClick={() => handleSavePerson(alertItem)}
                        disabled={savingId === alertItem.id}
                        className="w-full py-2 border-2 border-black text-black hover:bg-black hover:text-white transition-colors disabled:opacity-50"
                      >
                        {savingId === alertItem.id ? 'Saving...' : 'SAVE PERSON'}
                      </button>
                    </>
                  ) : (
                    <p className="font-semibold text-black">
                      {alertItem.personName || 'Known Person'}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
