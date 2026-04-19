# Attendance System Testing Checklist

## Pre-Testing Setup
- [ ] Server is running: `node index.js` in `server/` directory
- [ ] Frontend is running: `npm start` in root directory
- [ ] Database file exists: `server/attendance_db.sqlite`
- [ ] Browser console is open (F12) to see debug logs

## Test 1: Face Registration
1. [ ] Login to the application
2. [ ] Navigate to Attendance page
3. [ ] Click "📸 Register Face" button
4. [ ] Ensure camera is active (green LIVE indicator visible)
5. [ ] Face the camera clearly
6. [ ] Wait for face detection
7. [ ] Verify success message: "Face registered to your Wiki account successfully!"
8. [ ] Check browser console for: "Face registered successfully for user: [name]"

## Test 2: Mark Attendance
1. [ ] Click "✓ Mark Attendance Now" button
2. [ ] Verify GPS status changes to "✓ Acquired"
3. [ ] Verify location name is fetched (should show actual location, not coordinates)
4. [ ] Check browser console for: "Fetching location name from backend for: [lat] [lon]"
5. [ ] Check browser console for: "Backend geocoding response: {location: '...', source: '...'}"
6. [ ] Face should be detected automatically
7. [ ] Verify success message: "Attendance marked successfully!"
8. [ ] Check server console for: "Mark attendance request received"

## Test 3: Attendance History Display
1. [ ] Scroll down to "Attendance History" section
2. [ ] Verify table shows your attendance record
3. [ ] Check columns:
   - [ ] **Employee Name**: Should show your name (not "Unknown User")
   - [ ] **Date**: Should show today's date in format "DD MMM YYYY"
   - [ ] **Time**: Should show time in format "HH:MM:SS AM/PM"
   - [ ] **Location**: Should show location name (e.g., "Bangalore, India"), not coordinates
   - [ ] **Photo**: Should show your captured face image
   - [ ] **Status**: Should show "✓ Success" in green

## Test 4: Location Name Verification
1. [ ] Check that location name is NOT showing as "13.0312, 77.5597" (coordinates)
2. [ ] Location should be a readable address like:
   - "Bangalore, Karnataka, India"
   - "Whitefield, Bangalore, India"
   - Or similar location name
3. [ ] If coordinates are shown, check server logs for geocoding errors

## Test 5: Time Format Verification
1. [ ] Check that time is NOT showing as raw format
2. [ ] Time should be in format: "10:30:45 AM" or "02:15:30 PM"
3. [ ] Not in 24-hour format like "14:30:45"

## Test 6: Multiple Attendance Marks
1. [ ] Mark attendance again (wait a few seconds)
2. [ ] Verify new record appears in history table
3. [ ] Verify both records show correct employee name, time, and location

## Test 7: Error Handling
1. [ ] Try marking attendance without registering face first
   - [ ] Should show error: "No face registered on your Wiki account..."
2. [ ] Try marking attendance outside geofence (if possible)
   - [ ] Should show error: "Rejected (Out of bounds)"
3. [ ] Try marking attendance with face not matching
   - [ ] Should show error: "Rejected (Face mismatch)"

## Test 8: Backend Geocoding Endpoint
1. [ ] Open browser DevTools Network tab
2. [ ] Mark attendance
3. [ ] Look for request to: `http://localhost:5000/api/geocode?latitude=...&longitude=...`
4. [ ] Verify response contains: `{ location: "...", source: "primary" | "backup" | "coordinates" }`
5. [ ] Check server console for geocoding logs

## Expected Console Logs

### Frontend (Browser Console)
```
Fetching location name from backend for: 13.0312 77.5597
Backend geocoding response: {location: "Bangalore, Karnataka, India", source: "primary"}
Location name found: Bangalore, Karnataka, India
GPS acquired: 13.0312 77.5597
Location name: Bangalore, Karnataka, India
Detecting face...
Face detected, descriptor length: 128
Marking attendance with token: eyJhbGciOiJIUzI1NiIs...
Attendance response: {message: "Attendance marked successfully!"}
```

### Backend (Server Console)
```
Geocoding request for: 13.0312 77.5597
Primary API response status: OK
Location found (primary): Bangalore, Karnataka, India
Mark attendance request received
Token verified for user: [user_id]
Distance from office: 14320 meters
Face registered successfully for user: [name]
```

## Troubleshooting

### Issue: Location showing as coordinates instead of name
- [ ] Check server console for geocoding errors
- [ ] Verify API keys are correct in `server/index.js`
- [ ] Check if Google Maps API is enabled for the keys
- [ ] Try restarting server

### Issue: Face registration not working
- [ ] Check browser console for face detection errors
- [ ] Ensure camera has proper lighting
- [ ] Verify face is clearly visible in camera feed
- [ ] Check server console for registration errors

### Issue: Attendance not marking
- [ ] Verify face is registered first
- [ ] Check if within 20km geofence
- [ ] Verify GPS is enabled and working
- [ ] Check browser console for errors
- [ ] Check server console for errors

### Issue: Employee name showing as "Unknown User"
- [ ] Verify user is logged in
- [ ] Check that token is valid
- [ ] Verify user record exists in database
- [ ] Check server console for user lookup errors

## Success Criteria
- [ ] Face registration works without errors
- [ ] Attendance marking works without errors
- [ ] Employee name displays correctly in history
- [ ] Location name displays correctly (not coordinates)
- [ ] Time format is readable (HH:MM:SS AM/PM)
- [ ] All console logs show expected messages
- [ ] No errors in browser or server console
