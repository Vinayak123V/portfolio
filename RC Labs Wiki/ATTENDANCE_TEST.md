# Attendance API Testing Guide

## Quick Test Steps

### 1. Register a Test User
```bash
curl -X POST http://localhost:5000/api/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "department": "Engineering"
  }'
```

Response will include a JWT token. Save it.

### 2. Register Face
```bash
curl -X POST http://localhost:5000/api/attendance/register-face \
  -H "Authorization: Bearer {TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "face_encoding": [0.1, 0.2, 0.3, ... 128 values total]
  }'
```

### 3. Mark Attendance
```bash
curl -X POST http://localhost:5000/api/attendance/mark \
  -H "Content-Type: application/json" \
  -d '{
    "token": "{TOKEN}",
    "latitude": 13.1463,
    "longitude": 77.6190,
    "descriptor": [0.1, 0.2, 0.3, ... 128 values total],
    "image": "data:image/jpeg;base64,..."
  }'
```

### 4. Get Attendance History
```bash
curl http://localhost:5000/api/attendance/history?token={TOKEN}
```

### 5. Get Admin Dashboard
```bash
curl http://localhost:5000/api/attendance/admin
```

## Frontend Testing

1. Open browser to `http://localhost:3000`
2. Log in with test account
3. Navigate to Attendance page
4. Click "Register Face" - face should be detected and registered
5. Click "Mark Attendance Now" - should mark attendance if GPS is within bounds
6. Check "Your Attendance History" table for the new record

## Troubleshooting

### Server not responding
- Check if server is running: `Get-Process node`
- Restart server: Kill process and run `node server/index.js` in server folder

### Face not detected
- Check camera permissions in browser
- Ensure good lighting
- Face should be clearly visible in video feed

### GPS out of bounds
- Current office location: 13.1463°N, 77.6190°E
- You must be within 100 meters
- For testing, modify OFFICE_LAT and OFFICE_LON in server/index.js

### Database errors
- Check if `server/attendance_db.sqlite` exists
- If corrupted, delete it and restart server (will recreate)

## Database Inspection

To view attendance records directly:
```bash
sqlite3 server/attendance_db.sqlite
sqlite> SELECT * FROM attendance;
sqlite> .quit
```

## Common Issues & Fixes

| Issue | Fix |
|-------|-----|
| "No token provided" | Make sure Authorization header is set correctly |
| "Invalid or expired token" | Token may have expired (7 day expiry), log in again |
| "User not found" | User ID in token doesn't match any user in users.json |
| "No face registered" | Must call register-face endpoint first |
| "Face mismatch" | Euclidean distance > 0.85, try registering again with better lighting |
| "Out of bounds" | GPS location too far from office, move closer |
