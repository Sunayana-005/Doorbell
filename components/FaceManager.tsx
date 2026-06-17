'use client';

import { useState, useEffect, useRef } from 'react';

interface KnownPerson {
  id: string;
  name: string;
  imageUrl: string;
  addedAt: string;
}

export default function FaceManager() {
  const [knownPersons, setKnownPersons] = useState<KnownPerson[]>([]);
  const [newPersonName, setNewPersonName] = useState('');
  const [newPersonImage, setNewPersonImage] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchKnownPersons();
  }, []);

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

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      setNewPersonImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const addKnownPerson = async () => {
    if (!newPersonName.trim() || !newPersonImage) {
      alert('Please provide both a name and an image');
      return;
    }

    setIsAdding(true);

    try {
      const response = await fetch('/api/known-faces', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newPersonName,
          image: newPersonImage,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setNewPersonName('');
        setNewPersonImage(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        fetchKnownPersons();
        alert('Person added successfully!');
      } else {
        alert(`Failed to add person: ${data.error}`);
      }
    } catch (error) {
      console.error('Error adding person:', error);
      alert('Failed to add person');
    } finally {
      setIsAdding(false);
    }
  };

  const removePerson = async (id: string) => {
    if (!confirm('Are you sure you want to remove this person?')) {
      return;
    }

    try {
      const response = await fetch(`/api/known-faces?id=${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        fetchKnownPersons();
        alert('Person removed successfully!');
      } else {
        alert(`Failed to remove person: ${data.error}`);
      }
    } catch (error) {
      console.error('Error removing person:', error);
      alert('Failed to remove person');
    }
  };

  return (
    <div className="space-y-6">
      {/* Add New Person */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
        <h2 className="text-2xl font-bold mb-6">Add Known Person</h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Person Name</label>
            <input
              type="text"
              value={newPersonName}
              onChange={(e) => setNewPersonName(e.target.value)}
              placeholder="Enter name..."
              className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
            />

            <label className="block text-sm font-medium mb-2 mt-4">Upload Photo</label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer"
            />

            <button
              onClick={addKnownPerson}
              disabled={isAdding || !newPersonName.trim() || !newPersonImage}
              className="w-full mt-4 px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAdding ? 'Adding...' : '✓ Add Person'}
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Preview</label>
            <div className="aspect-square bg-black rounded-lg overflow-hidden">
              {newPersonImage ? (
                <img src={newPersonImage} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  <div className="text-center">
                    <p className="text-4xl mb-2">👤</p>
                    <p>No image selected</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Known Persons List */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
        <h2 className="text-2xl font-bold mb-6">Known Persons Database</h2>

        {knownPersons.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <p className="text-lg">No known persons yet</p>
            <p className="text-sm mt-2">Add people above to build your face database</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {knownPersons.map((person) => (
              <div
                key={person.id}
                className="bg-gray-700/30 rounded-lg overflow-hidden border border-gray-600 hover:border-blue-500 transition-all"
              >
                <div className="relative aspect-square bg-black">
                  <img
                    src={person.imageUrl}
                    alt={person.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-1">{person.name}</h3>
                  <p className="text-xs text-gray-400 mb-3">
                    Added: {new Date(person.addedAt).toLocaleDateString()}
                  </p>
                  <button
                    onClick={() => removePerson(person.id)}
                    className="w-full px-4 py-2 bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white border border-red-600 rounded-lg text-sm font-medium transition-all"
                  >
                    🗑️ Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="bg-blue-900/20 border border-blue-500/50 rounded-xl p-4">
        <p className="text-sm text-blue-300">
          💡 <strong>Tip:</strong> For best results, use clear frontal photos with good lighting. The
          system will learn to recognize these people and won't send alerts when they arrive at your
          door.
        </p>
      </div>
    </div>
  );
}
