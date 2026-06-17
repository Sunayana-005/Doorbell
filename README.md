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
- That's it!

### Dashboard Page
- View all visitor history
- Unknown persons show "Unknown Person"
- Known persons show their name
- Click **SAVE PERSON** to add unknown visitors to your known faces database

## Usage Flow

1. **Start on Home Page** → Choose Doorbell or Dashboard
2. **Doorbell Page** → Press RING button when someone arrives
3. **Dashboard Page** → View visitors, save unknown people

## Design Philosophy

- ✅ Minimal interface
- ✅ Black and white only
- ✅ Simple navigation
- ✅ Clean typography
- ✅ No unnecessary colors or decorations

## Technology

- Next.js 16
- TypeScript
- Tailwind CSS
- Socket.IO (real-time)
- Face detection

## Production Notes

- Face detection is simulated for demo
- Data stored in-memory (resets on restart)
- For production: add real ML models and database

---

Built with Next.js
