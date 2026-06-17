# ⚡ Quick Start Guide

## 1️⃣ Installation (30 seconds)

```bash
npm install
npm run dev
```

Open: **http://localhost:3000**

## 2️⃣ Three Tabs Explained

### 📺 Indoor Receiver
**What:** Your monitoring dashboard  
**Shows:** Real-time alerts and visitor history  
**Keep it open:** To see alerts as they happen

### 📷 Doorbell Camera  
**What:** Simulates the outdoor camera  
**Use it to:** Capture/upload visitor photos  
**Triggers:** Face detection and alerts

### 👥 Manage Faces
**What:** Your face database  
**Use it to:** Add family/friends so they don't trigger alerts  
**One-time setup:** Add known persons here first

## 3️⃣ Demo in 60 Seconds

```
Step 1: Add a Known Person
├─ Go to "Manage Faces"
├─ Name: "Alice"
├─ Upload photo of Alice
└─ Click "Add Person" ✓

Step 2: Test Unknown Alert
├─ Go to "Indoor Receiver" (keep tab open)
├─ Go to "Doorbell Camera" (new tab)
├─ Upload photo of Bob (someone different)
└─ Watch alert appear on Indoor Receiver! 🚨

Step 3: Test Known Person
├─ Go to "Doorbell Camera"
├─ Upload the SAME photo of Alice
└─ No alert! Green checkmark ✓
```

## 4️⃣ What's Happening Behind the Scenes?

```
YOU upload image
    ↓
AI detects faces
    ↓
Compares with database
    ↓
┌─────────────┬─────────────┐
│ Known       │ Unknown     │
│ (No Alert)  │ (Alert! 🚨) │
└─────────────┴─────────────┘
```

## 5️⃣ Features at a Glance

✅ Real-time alerts via WebSocket  
✅ Face detection & recognition  
✅ Known person database  
✅ Alert history (last 10)  
✅ Webcam support  
✅ Image upload support  
✅ Connection status indicator  
✅ Beautiful dark theme UI  

## 6️⃣ Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Run production server
```

## 7️⃣ Ports

- **App:** http://localhost:3000
- **Socket.IO:** Runs on same port

## 8️⃣ File Structure

```
app/
├── page.tsx              # Main app
├── api/                  # Backend endpoints
│   ├── process-image/    # Face detection
│   ├── known-faces/      # Database CRUD
│   └── alerts/           # Alert history
components/
├── DoorbellCamera.tsx    # Camera simulator
├── IndoorReceiver.tsx    # Alert dashboard
└── FaceManager.tsx       # Face database
lib/
├── faceDetection.ts      # AI logic
├── storage.ts            # In-memory DB
└── socket.ts             # WebSocket
server.js                 # Custom Socket.IO server
```

## 9️⃣ Troubleshooting

**Camera not working?**  
→ Allow camera permissions in browser

**Socket not connected?**  
→ Refresh the page

**Alert not showing?**  
→ Make sure Indoor Receiver tab is open

**Face not detected?**  
→ Use clear, frontal photos with good lighting

## 🔟 Pro Tips

💡 **Open 2 tabs side by side:** Indoor Receiver + Doorbell Camera  
💡 **Add 2-3 known persons** before testing  
💡 **Use different photos** to see both alert types  
💡 **Keep Indoor Receiver open** to see real-time alerts  

---

## 🎯 Ready to Start?

```bash
npm run dev
```

Then visit **http://localhost:3000** and start with the "Manage Faces" tab!

---

**Need more details?** Check `README.md` or `DEMO_GUIDE.md`
