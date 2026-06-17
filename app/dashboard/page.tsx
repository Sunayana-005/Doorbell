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

interface KnownPerson {
  id: string;
  name: string;
  imageUrl: string;
  addedAt: string;
}

export default function DashboardPage() {
  const [latestAlert, setLatestAlert] = useState<Alert | null>(null);
  const [knownPersons, setKnownPersons] = useState<KnownPerson[]>([]);
  const [showKnownFaces, setShowKnownFaces] = useState(false);
  const [savingId, setSavingId] = useState<string | null>(null);

  useEffect(() => {
    const socket = io();

    socket.on('connect', () => {
      console.log('Connected to backend');
    });

    socket.on('unknown_face_alert', (alert: Alert) => {
      setLatestAlert(alert);
    });

    socket.on('known_face_detected', (alert: Alert) => {
      setLatestAlert(alert);
    });

    fetchLatestAlert();
    fetchKnownPersons();

    return () => {
      socket.disconnect();
    };
  }, []);

  const fetchLatestAlert = async () => {
    try {
      const response = await fetch('/api/alerts');
      const data = await response.json();
      if (data.success && data.alerts.length > 0) {
        setLatestAlert(data.alerts[0]);
      }
    } catch (error) {
      console.error('Error fetching alerts:', error);
    }
  };

  const fetchKnownPersons = async () => {
    try {
      const response = await fetch('/api/known-faces');
      const data = await response.json();
      if (data.success) {
        setKnownPersons(data.faces);
      }
    } catch (error) {
      console.error('Error fetching known persons:', error);
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
        fetchKnownPersons();
        fetchLatestAlert();
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

  if (showKnownFaces) {
    return (
      <div className="min-h-screen bg-white">
        <div className="p-4 border-b border-black">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <button 
              onClick={() => setShowKnownFaces(false)}
              className="text-black hover:underline"
            >
              ← Back to Dashboard
            </button>
            <h1 className="text-2xl font-bold text-black">Known Faces</h1>
            <div className="w-32"></div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto p-8">
          {knownPersons.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p>No known persons yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {knownPersons.map((person) => (
                <div key={person.id} className="flex flex-col items-center">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-black mb-3 bg-gray-100">
                    <img
                      src={person.imageUrl}
                      alt={person.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-center font-semibold text-black">{person.name}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="p-4 border-b border-black">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-black hover:underline">
            ← Back
          </Link>
          <h1 className="text-2xl font-bold text-black">Dashboard</h1>
          <button
            onClick={() => setShowKnownFaces(true)}
            className="px-4 py-2 border-2 border-black text-black hover:bg-black hover:text-white transition-colors"
          >
            Known Faces
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-8">
        {latestAlert ? (
          <div className="flex flex-col items-center">
            <h2 className="text-xl font-semibold mb-8 text-black">Current Visitor</h2>
            
            <div className="w-64 h-64 rounded-full overflow-hidden border-4 border-black mb-6 bg-gray-100">
              <img
                src={latestAlert.imageUrl}
                alt="Visitor"
                className="w-full h-full object-cover"
              />
            </div>

            <p className="text-sm text-gray-600 mb-4">
              {new Date(latestAlert.timestamp).toLocaleString()}
            </p>

            {latestAlert.isUnknown ? (
              <div className="text-center space-y-4">
                <p className="text-2xl font-bold text-black">Unknown Person</p>
                <button
                  onClick={() => handleSavePerson(latestAlert)}
                  disabled={savingId === latestAlert.id}
                  className="px-8 py-3 border-2 border-black text-black hover:bg-black hover:text-white transition-colors disabled:opacity-50 text-lg"
                >
                  {savingId === latestAlert.id ? 'Saving...' : 'SAVE PERSON'}
                </button>
              </div>
            ) : (
              <p className="text-2xl font-bold text-black">
                {latestAlert.personName || 'Known Person'}
              </p>
            )}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <p className="text-xl">No visitor yet</p>
            <p className="text-sm mt-2">Waiting for someone to ring the bell...</p>
          </div>
        )}
      </div>
    </div>
  );
}
