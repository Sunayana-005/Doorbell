# Usage Guide

## How to Use the System

### 1. Start the Server
```bash
npm run dev
```
Open: **http://localhost:3000**

### 2. Home Page
Simple choice:
- **Doorbell** → Camera page
- **Dashboard** → Monitoring page

### 3. Doorbell Page
- Camera starts automatically
- Press the circular **RING** button
- Image is captured and processed
- Face is auto-cropped for better circular display

### 4. Dashboard Page

#### Main View - Current Visitor
- Shows only the **latest person** who rang the bell
- Large circular photo (auto-cropped to focus on face)
- Shows timestamp
- If **Unknown Person**: Click "SAVE PERSON" to add to database
- If **Known Person**: Shows their name

#### Known Faces View
- Click **"Known Faces"** button in top right
- View all saved persons
- Circular photos with names below
- Click "Back to Dashboard" to return

## Features

✅ **Circular Images** - All photos displayed in clean circles  
✅ **Auto Face Crop** - Images automatically cropped to center faces  
✅ **Current Visitor Only** - Dashboard shows latest person, not full history  
✅ **Known Faces Gallery** - Separate view for all known persons  
✅ **Real-time Updates** - Dashboard updates when someone rings  
✅ **Simple Save** - One button to save unknown persons  

## Workflow

```
1. Someone rings doorbell
   ↓
2. Dashboard updates with their circular photo
   ↓
3. If unknown → Click "SAVE PERSON" → Enter name
   ↓
4. Click "Known Faces" to see everyone you've saved
```

## Design

- Minimal black and white
- Clean borders
- Circular photos
- Simple navigation
- No unnecessary colors or decorations

---

**That's it!** Simple and functional.
