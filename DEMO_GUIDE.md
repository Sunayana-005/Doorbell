# Demo Guide - Smart Doorbell System

## Quick Demo Steps

### Step 1: Start the Server
```bash
npm run dev
```

Visit: http://localhost:3000

### Step 2: Demo Flow

#### 🎬 Scenario 1: Unknown Visitor Alert

1. **Navigate to "Indoor Receiver" tab**
   - Keep this tab open to see real-time alerts

2. **Open "Doorbell Camera" tab** (in a new browser tab or window)
   - Click "Upload Image" or "Start Camera"
   - Upload/capture a photo of someone
   - Watch the processing happen

3. **Go back to "Indoor Receiver" tab**
   - You should see the alert appear in real-time!
   - Red alert for unknown person

#### 🎬 Scenario 2: Known Person (No Alert)

1. **Navigate to "Manage Faces" tab**
   - Enter a name (e.g., "John Doe")
   - Upload a photo
   - Click "Add Person"

2. **Go to "Doorbell Camera" tab**
   - Upload THE SAME photo you just added
   - System will recognize the person
   - Green checkmark - no alert sent!

3. **Try a different photo**
   - Upload a different person's photo
   - This will trigger an unknown alert

### Step 3: See it in Action

#### Real-Time Features
- ✅ Instant alerts via Socket.IO
- ✅ Alert history (last 10 events)
- ✅ Connection status indicator
- ✅ Face database management

#### Test Cases

**✅ Test 1: Face Detection**
- Upload image with face → Detects 1 face
- Upload image without face → Detects 0 faces

**✅ Test 2: Face Recognition**
- Add person to database
- Upload same person → Recognized (green)
- Upload different person → Unknown (red alert)

**✅ Test 3: Real-Time Alerts**
- Keep Indoor Receiver open
- Trigger doorbell in another tab
- Alert appears instantly

### Architecture Overview

```
┌──────────────────────┐
│   Indoor Receiver    │  ← You watch alerts here
│   (Tab 1)            │
└──────────────────────┘
         ↑ Socket.IO
         │ Real-time
         │
┌────────┴─────────────┐
│   Backend Server     │
│   - Face Detection   │
│   - Recognition      │
│   - Socket.IO        │
└────────┬─────────────┘
         ↓ HTTP
┌──────────────────────┐
│  Doorbell Camera     │  ← You trigger events here
│  (Tab 2)             │
└──────────────────────┘
```

## Demo Tips

### For Best Demo Experience

1. **Use Two Browser Windows Side by Side**
   - Left: Indoor Receiver (to see alerts)
   - Right: Doorbell Camera (to trigger events)

2. **Prepare Test Images**
   - Have 2-3 different face photos ready
   - Use clear, frontal face photos
   - Good lighting helps

3. **Demo Flow**
   - Start with managing faces (add 1-2 known persons)
   - Then demonstrate unknown alerts
   - Show the known person recognition
   - Show the alert history

### Talking Points

- **Real-time Communication**: Uses Socket.IO for instant alerts
- **Face Recognition**: Compares face descriptors using Euclidean distance
- **Privacy First**: Data stored in-memory (demo mode)
- **Scalable Architecture**: Ready for production ML models
- **User-Friendly**: Simple interface for homeowners

## Common Issues

### Issue: Camera Permission Denied
**Solution**: Click the browser's permission prompt to allow camera access

### Issue: Socket Not Connected
**Solution**: Refresh the page or restart the dev server

### Issue: Face Not Detected
**Solution**: 
- Use a clear photo with visible face
- Ensure good lighting
- Try a different image

## Production Readiness

This demo uses:
- ✅ Simulated face detection (deterministic)
- ✅ In-memory storage
- ✅ Socket.IO for real-time
- ✅ TypeScript for type safety

For production, add:
- 🔧 Real ML models (TensorFlow.js, face-api.js)
- 🔧 Database (PostgreSQL, MongoDB)
- 🔧 Authentication & authorization
- 🔧 Cloud storage (S3)
- 🔧 HTTPS & security hardening

---

**Ready to demo? Run `npm run dev` and visit http://localhost:3000** 🚀
