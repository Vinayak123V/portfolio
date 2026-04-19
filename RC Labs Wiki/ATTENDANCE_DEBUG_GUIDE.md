# Attendance System - Debugging Guide

## What Was Fixed

### Issue: "Failed to register face"

**Root Cause:** The video element wasn't fully initialized when face detection was attempted.

**Solution:** Added video readiness checks before face detection:
1. Check if video element exists and has a stream
2. Wait for video to have enough data (HAVE_ENOUGH_DATA state)
3. Only then attempt face detection

### Changes Made

**File: `src/pages/Attendance.js`**

1. **Added video readiness check in registerFace():**
```javascript
if (!videoRef.current || !videoRef.current.srcObject) {
  return setError("Camera not initialized. Please wait a moment and try again.");
}

// Wait for video to be ready
if (videoRef.current.readyState !== videoRef.current.HAVE_ENOUGH_DATA) {
  await new Promise(resolve => {
    const checkReady = () => {
      if (videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA) {
        resolve();
      } else {
        setTimeout(checkReady, 100);
      }
    };
    checkReady();
  });
}
```

2. **Added same check in markAttendance():**
   - Ensures video is ready before GPS and face detection
   - Prevents race conditions

3. **Added console logging:**
   - Logs each step of the process
   - Helps identify where failures occur
   - Check browser console (F12) for detailed logs

**File: `server/index.js`**

1. **Added logging to register-face endpoint:**
```javascript
console.log('Register face request received. User ID:', req.user.id);
console.log('Face encoding received:', face_encoding ? `${face_encoding.length} values` : 'MISSING');
```

2. **Added logging to mark attendance endpoint:**
```javascript
console.log('Mark attendance request received');
console.log('Token verified for user:', decoded.id);
console.log('Distance from office:', Math.round(dist), 'meters');
```

## How to Debug

### Step 1: Open Browser Console
1. Press `F12` to open Developer Tools
2. Go to **Console** tab
3. Keep it open while testing

### Step 2: Try Register Face
1. Click "Register Face" button
2. Watch console for logs:
   ```
   Video ready, detecting face...
   Face detected, descriptor length: 128
   Registering face with token: eyJhbGciOiJIUzI1NiIs...
   Face registration response: {message: "Face registered successfully!"}
   ```

### Step 3: Check for Errors
If you see errors, look for:

| Error | Meaning | Fix |
|-------|---------|-----|
| "Camera not initialized" | Video element not ready | Wait 2-3 seconds, try again |
| "No face detected" | Face not visible in camera | Better lighting, face camera |
| "Failed to register face" | API call failed | Check server logs |
| "Not logged in" | Token missing | Log in again |

### Step 4: Check Server Logs
1. Look at terminal where server is running
2. Should see logs like:
   ```
   Register face request received. User ID: 1712345678
   Face encoding received: 128 values
   Face registered successfully for user: John Doe
   ```

## Testing Checklist

- [ ] Browser console shows no errors
- [ ] Video element displays camera feed
- [ ] "Video ready, detecting face..." appears in console
- [ ] Face is detected (descriptor length: 128)
- [ ] Token is logged (first 20 chars)
- [ ] Server logs show "Face registered successfully"
- [ ] Success message appears on screen
- [ ] Can mark attendance after registration

## Common Issues & Solutions

### Issue 1: "Camera not initialized"
**Cause:** Video element not ready
**Solution:**
1. Wait 2-3 seconds after page loads
2. Ensure camera permission is granted
3. Refresh page and try again

### Issue 2: "No face detected"
**Cause:** Face not visible or poor lighting
**Solution:**
1. Ensure good lighting (avoid backlighting)
2. Face camera directly
3. Remove glasses if possible
4. Move closer to camera
5. Try again

### Issue 3: "Failed to register face" (no other error)
**Cause:** Server not responding or API error
**Solution:**
1. Check server is running: `node server/index.js`
2. Check browser console for network errors
3. Check server logs for errors
4. Restart server if needed

### Issue 4: Face detected but still fails
**Cause:** API call failed
**Solution:**
1. Check browser console for error details
2. Check server logs
3. Verify token is valid (log in again)
4. Check network tab in DevTools for API response

## Advanced Debugging

### Check Network Requests
1. Open DevTools (F12)
2. Go to **Network** tab
3. Click "Register Face"
4. Look for POST request to `localhost:5000/api/attendance/register-face`
5. Check:
   - Status: Should be 200
   - Headers: Should have `Authorization: Bearer {token}`
   - Response: Should show success message

### Check Server Logs
1. Look at terminal running server
2. Should see:
   ```
   Register face request received. User ID: 1712345678
   Face encoding received: 128 values
   Face registered successfully for user: John Doe
   ```

### Test API Directly
Use curl to test API:
```bash
# Get token first
curl -X POST http://localhost:5000/api/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","password":"pass123"}'

# Then register face
curl -X POST http://localhost:5000/api/attendance/register-face \
  -H "Authorization: Bearer {TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{"face_encoding":[0.1,0.2,...]}'
```

## Performance Tips

1. **Faster face detection:**
   - Ensure good lighting
   - Face camera directly
   - Keep face in center of frame

2. **Faster API response:**
   - Check internet connection
   - Verify server is running
   - Check server isn't overloaded

3. **Faster video initialization:**
   - Allow camera permission immediately
   - Don't block camera access
   - Use modern browser (Chrome, Firefox, Safari, Edge)

## Browser Compatibility

| Browser | Support | Notes |
|---------|---------|-------|
| Chrome | ✅ Full | Best performance |
| Firefox | ✅ Full | Good performance |
| Safari | ✅ Full | May need permission |
| Edge | ✅ Full | Good performance |
| IE 11 | ❌ No | Not supported |

## Still Having Issues?

1. **Check all prerequisites:**
   - [ ] Logged in to RC Labs Wiki
   - [ ] Camera permission granted
   - [ ] Server running on port 5000
   - [ ] Good lighting
   - [ ] Modern browser

2. **Try these steps:**
   - [ ] Refresh page (Ctrl+R or Cmd+R)
   - [ ] Clear browser cache (Ctrl+Shift+Delete)
   - [ ] Restart server
   - [ ] Restart browser
   - [ ] Try different browser

3. **Check logs:**
   - [ ] Browser console (F12)
   - [ ] Server terminal
   - [ ] Network tab in DevTools

4. **Contact support with:**
   - [ ] Screenshot of error
   - [ ] Browser console logs
   - [ ] Server logs
   - [ ] Steps to reproduce

---

**Last Updated:** April 7, 2026
**Version:** 1.0.0
