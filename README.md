# 🔔 Smart Doorbell System with Face Detection

A Next.js-based smart doorbell system that uses face detection to identify visitors and send alerts for unknown persons.

## Features

- 📷 **Doorbell Camera Simulator** - Capture images via webcam or upload
- 🤖 **Face Detection** - Automatically detects faces in captured images
- 👥 **Face Recognition** - Recognizes known persons vs unknown visitors
- 🚨 **Real-time Alerts** - Instant notifications for unknown visitors
- 📺 **Indoor Receiver** - Dashboard to view alerts and activity
- 💾 **Face Database Management** - Add/remove known persons

## Quick Start

### Prerequisites

- Node.js 18+ installed
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## How to Use

### 1. Add Known Persons

1. Go to the **"Manage Faces"** tab
2. Enter a person's name
3. Upload a clear photo of their face
4. Click "Add Person"

### 2. Simulate Doorbell Activity

1. Go to the **"Doorbell Camera"** tab
2. Either:
   - Click "Start Camera" to use your webcam
   - Click "Upload Image" to upload a photo
3. The system will:
   - Detect faces in the image
   - Check if the person is known or unknown
   - Send an alert if unknown

### 3. Monitor Activity

1. Go to the **"Indoor Receiver"** tab
2. View real-time alerts for unknown visitors
3. See history of all recent activity

## Technology Stack

- **Next.js 16** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Socket.IO** - Real-time communication
- **Face Detection** - Simulated (ready for production ML models)

## Architecture

```
┌─────────────────┐      ┌──────────────────┐      ┌─────────────────┐
│  Doorbell       │      │   Backend API    │      │  Indoor         │
│  Camera         │─────>│   - Face         │─────>│  Receiver       │
│  (Simulator)    │      │     Detection    │      │  (Dashboard)    │
└─────────────────┘      │   - Recognition  │      └─────────────────┘
                         │   - Socket.IO    │
                         └──────────────────┘
                                  │
                                  v
                         ┌──────────────────┐
                         │  Face Database   │
                         │  (In-Memory)     │
                         └──────────────────┘
```

## API Endpoints

- `POST /api/process-image` - Process captured images
- `GET /api/known-faces` - Get all known persons
- `POST /api/known-faces` - Add a known person
- `DELETE /api/known-faces?id=xxx` - Remove a person
- `GET /api/alerts` - Get recent alerts

## Production Deployment

For production use, consider:

1. **Real Face Detection**: Integrate actual face detection models (TensorFlow.js, face-api.js)
2. **Database**: Replace in-memory storage with PostgreSQL/MongoDB
3. **Authentication**: Add user authentication and authorization
4. **Cloud Storage**: Store images in S3 or similar
5. **Security**: Add encryption, rate limiting, and HTTPS

## Development Notes

- Face detection is currently simulated for demo purposes
- Data is stored in-memory and will reset on server restart
- For production, implement proper ML models and persistent storage

## License

MIT

---

Built with ❤️ using Next.js
