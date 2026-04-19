# Attendance System - Quick Start Guide

## 🚀 Get Started in 3 Steps

### 1️⃣ Login
- Open the app at `http://localhost:3000`
- Log in with your credentials
- You'll see "Attendance" in the top navigation

### 2️⃣ Register Your Face (First Time Only)
- Click **Attendance** in the top nav
- Click **"Register Face"** button
- Face the camera with good lighting
- Wait for: ✅ "Face registered to your Wiki account successfully!"

### 3️⃣ Mark Attendance
- Click **"Mark Attendance Now"** button
- Allow GPS location permission when prompted
- System checks:
  - ✅ Your face matches registered face
  - ✅ You're within 100m of office
  - ✅ Captures timestamp and image
- See success message: ✅ "Attendance marked successfully!"
- Check **"Your Attendance History"** table

## 📋 What You'll See

### Success Flow
```
Click "Mark Attendance Now"
    ↓
Allow GPS permission
    ↓
Face detected ✓
    ↓
Face matches ✓
    ↓
GPS within bounds ✓
    ↓
✅ "Attendance marked successfully!"
    ↓
Record appears in history table
```

### Error Examples
| Error | Fix |
|-------|-----|
| "No face detected" | Better lighting, face camera |
| "Face mismatch" | Register again with better lighting |
| "Out of bounds" | Move closer to office |
| "Not logged in" | Log in first |

## 🔧 Troubleshooting

**Camera not working?**
- Check browser permissions (Settings → Privacy → Camera)
- Refresh page
- Try different browser

**GPS not working?**
- Enable location services on device
- Allow location permission in browser
- Move to a location with GPS signal

**Face not registering?**
- Ensure good lighting (avoid backlighting)
- Face camera directly
- Remove glasses if possible
- Try again with different angle

## 📊 Admin Dashboard

**View all attendance records:**
- Click **"Admin: Attendance"** in HR Policies section
- See all employees' check-ins
- View GPS coordinates and verification images

## 🔐 Security Features

✅ Face recognition (prevents spoofing)
✅ GPS geofencing (prevents remote check-in)
✅ Image capture (audit trail)
✅ JWT authentication (secure tokens)
✅ Password hashing (bcrypt)

## 📱 What Gets Recorded

For each attendance mark:
- ✅ Employee name
- ✅ Date & time
- ✅ GPS coordinates (latitude, longitude)
- ✅ Verification image
- ✅ Status (Success/Rejected)

## ⚙️ System Requirements

- ✅ Modern browser (Chrome, Firefox, Safari, Edge)
- ✅ Webcam/camera
- ✅ GPS or WiFi for location
- ✅ Internet connection
- ✅ Logged in to RC Labs Wiki

## 🎯 Office Location

**Where:** Bangalore, India
**Coordinates:** 13.1463°N, 77.6190°E
**Radius:** 100 meters

You must be within 100m of this location to mark attendance.

## 📞 Need Help?

1. Check error message on screen
2. Read ATTENDANCE_SETUP.md for detailed guide
3. Check browser console (F12) for errors
4. Verify server is running: `node server/index.js`

---

**That's it!** You're ready to use the attendance system. 🎉
