# Attendance & Face Recognition Setup Guide

## Overview
The attendance system uses face recognition and GPS geofencing to mark employee attendance. It requires:
1. Face registration (one-time setup)
2. GPS location within 100m of office
3. Face match verification

## Backend Setup

The backend is already implemented in `server/index.js` with the following endpoints:

### Endpoints

**1. Register Face**
- **POST** `/api/attendance/register-face`
- **Headers**: `Authorization: Bearer {token}`
- **Body**: `{ face_encoding: [array of 128 numbers] }`
- **Response**: `{ message: "Face registered successfully!" }`

**2. Mark Attendance**
- **POST** `/api/attendance/mark`
- **Body**:
  ```json
  {
    "token": "jwt_token",
    "latitude": 13.1463,
    "longitude": 77.6190,
    "descriptor": [array of 128 numbers],
    "image": "base64_encoded_image"
  }
  ```
- **Response**: `{ message: "Attendance marked successfully!" }` or error

**3. Get Attendance History**
- **GET** `/api/attendance/history?token={jwt_token}`
- **Response**: Array of attendance records

**4. Admin Dashboard**
- **GET** `/api/attendance/admin`
- **Response**: All attendance records with employee names

### Database
- SQLite database: `server/attendance_db.sqlite`
- Table: `attendance` with columns: id, user_id, date, check_in_time, latitude, longitude, image, status

### Geofence Settings
- Office Location: 13.1463°N, 77.6190°E (Bangalore, India)
- Radius: 100 meters
- Modify in `server/index.js` lines 220-221

## Frontend Setup

### How to Use

1. **Login First**
   - Navigate to the Attendance page
   - You must be logged in with a valid account

2. **Register Your Face (One-time)**
   - Click "Register Face" button
   - Face the camera with good lighting
   - System will detect and store your face encoding
   - You'll see: "Face registered to your Wiki account successfully!"

3. **Mark Attendance**
   - Click "Mark Attendance Now" button
   - System will:
     - Get your GPS location (must allow location permission)
     - Detect your face from webcam
     - Compare with registered face
     - Record attendance if all checks pass
   - You'll see success or error message

### Error Messages & Solutions

| Error | Cause | Solution |
|-------|-------|----------|
| "No face detected in webcam" | Camera can't see your face | Adjust lighting, face camera directly |
| "No face registered on your Wiki account" | Haven't registered face yet | Click "Register Face" first |
| "Rejected (Face mismatch)" | Face doesn't match registered face | Ensure same person, good lighting |
| "Rejected (Out of bounds)" | GPS location too far from office | Move closer to office (within 100m) |
| "Camera permission denied" | Browser blocked camera access | Allow camera in browser settings |
| "Not logged in" | Session expired or not authenticated | Log in again |

## Fixed Issues

### Issue 1: Token Key Mismatch
- **Problem**: Frontend was using wrong localStorage key
- **Fix**: Changed from generic token to `rc_token` (matches AuthContext)

### Issue 2: Missing Login Check
- **Problem**: Functions didn't check if user was logged in
- **Fix**: Added token validation before API calls

### Issue 3: Inconsistent Error Handling
- **Problem**: Errors weren't properly displayed to user
- **Fix**: Improved error messages and display logic

## Testing Checklist

- [ ] User can register face successfully
- [ ] User can mark attendance with valid GPS and face
- [ ] System rejects attendance if face doesn't match
- [ ] System rejects attendance if GPS is out of bounds
- [ ] Attendance history displays correctly
- [ ] Admin dashboard shows all records
- [ ] Error messages are clear and actionable

## Development Notes

- Face descriptors are 128-dimensional vectors from face-api.js
- Euclidean distance < 0.85 is considered a match
- Haversine formula used for GPS distance calculation
- All timestamps stored in ISO 8601 format
- Images stored as base64 in database for easy retrieval

## Next Steps (Optional Enhancements)

1. Add multiple face registration (backup faces)
2. Implement check-out functionality
3. Add attendance reports and analytics
4. Implement face liveness detection (prevent spoofing)
5. Add SMS/email notifications for attendance
6. Implement attendance approval workflow
