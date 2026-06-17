import { getIO } from './socket';

interface KnownFace {
  id: string;
  name: string;
  imageUrl: string;
  descriptor: Float32Array;
  addedAt: string;
}

interface Alert {
  id: string;
  imageUrl: string;
  timestamp: string;
  isUnknown: boolean;
  personName?: string;
  eventType?: string;
}

// In-memory storage (for demo purposes)
// In production, use a real database
let knownFaces: KnownFace[] = [];
let alerts: Alert[] = [];

export function getSocket() {
  return getIO();
}

export async function addKnownFace(face: KnownFace) {
  knownFaces.push(face);
  return face;
}

export async function removeKnownFace(id: string) {
  knownFaces = knownFaces.filter((f) => f.id !== id);
  return true;
}

export async function getKnownFaces() {
  return knownFaces;
}

export async function saveAlert(alert: Alert) {
  alerts.unshift(alert);
  
  // Keep only last 50 alerts
  if (alerts.length > 50) {
    alerts = alerts.slice(0, 50);
  }
  
  return alert;
}

export async function getAlerts() {
  return alerts.slice(0, 10); // Return last 10 alerts
}
