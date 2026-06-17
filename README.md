# 🔔 Smart Doorbell System

A minimal, clean doorbell system with face detection.

## Quick Start

```bash
npm install
npm run dev
```

Open: **http://localhost:3000**

## How It Works

### Home Page
Two simple options:
- **Doorbell** - The outdoor camera interface
- **Dashboard** - Monitor and manage visitors

### Doorbell Page
- Camera opens automatically
- One circular **RING** button
- Press to capture and process the image
- Auto-crops to face for better display

### Dashboard Page

#### Main View
- Shows **current visitor only** (not history)
- Large circular photo (auto-cropped to face)
- Unknown persons: Click **SAVE PERSON**
- Known persons: Shows their name

#### Known Faces View
- Click **"Known Faces"** button (top right)
- View all saved persons in circular format
- Click "Back to Dashboard" to return

## Features

- ✅ Circular face-focused photos
- ✅ Auto face cropping
- ✅ Current visitor display (not full history)
- ✅ Known faces gallery
- ✅ Real-time updates
- ✅ One-click save

## Design Philosophy

- ✅ Minimal interface
- ✅ Black and white only
- ✅ Circular images
- ✅ Simple navigation
- ✅ Clean typography
- ✅ No unnecessary colors

## Usage Flow

1. Someone rings doorbell
2. Dashboard shows their circular photo
3. If unknown → Save them with name
4. View all known faces in gallery

## Technology

- Next.js 16
- TypeScript
- Tailwind CSS
- Socket.IO (real-time)
- Face detection with auto-crop

## Production Notes

- Face detection is simulated for demo
- Data stored in-memory (resets on restart)
- For production: add real ML models and database

---

Built with Next.js
