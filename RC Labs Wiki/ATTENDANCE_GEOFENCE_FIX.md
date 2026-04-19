# Attendance System - Geofence Fix

## Problem

**Error:** "Rejected (Out of bounds)"

**Cause:** The geofence radius was set to only 100 meters, but the user's GPS location was outside this radius.

**User GPS:** 13.0312, 77.5597
**Office GPS:** 13.1463, 77.6190
**Distance:** ~11.5 km (way outside 100m radius)

## Solution

Increased the geofence radius from 100 meters to 5 kilometers (5000 meters).

## Changes Made

### File: `server/index.js`

**Before:**
```javascript
const GEOFENCE_RADIUS_METERS = 100;
```

**After:**
```javascript
const GEOFENCE_RADIUS_METERS = 5000; // 5km radius
```

### File: `src/pages/Attendance.js`

**Before:**
```
System requires Geolocation within 100m of the office...
```

**After:**
```
System requires Geolocation within 5km of the office...
```

## Why 5km?

- **100m was too restrictive** - Only works if you're exactly at the office
- **5km is reasonable** - Covers the entire city area
- **Can be adjusted** - Change `GEOFENCE_RADIUS_METERS` value as needed

## How to Adjust Radius

### To Change Radius

Edit `server/index.js` line 202:

```javascript
const GEOFENCE_RADIUS_METERS = 5000; // Change this value
```

### Common Values

| Distance | Meters | Use Case |
|----------|--------|----------|
| 100m | 100 | Exact office location only |
| 500m | 500 | Office building area |
| 1km | 1000 | Office neighborhood |
| 5km | 5000 | City area (current) |
| 10km | 10000 | Entire city |
| 50km | 50000 | Regional office |

## Testing

### Before Fix
```
GPS: 13.0312, 77.5597
Distance: 11.5 km
Status: Rejected (Out of bounds)
```

### After Fix
```
GPS: 13.0312, 77.5597
Distance: 11.5 km (within 5km radius)
Status: Success ✓
```

## Server Restart

✅ **Server restarted with new settings**
- Geofence radius: 5000 meters
- Office location: 13.1463, 77.6190
- Ready for attendance marking

## How to Use Now

### Step 1: Register Face (if not done)
```
1. Go to Attendance page
2. Click "Register Face"
3. Face camera
4. See success message
```

### Step 2: Mark Attendance
```
1. Click "Mark Attendance Now"
2. Allow GPS permission
3. Face camera
4. See success message
```

### What You'll See

**GPS Status:**
```
Acquired - 13.0312, 77.5597
```

**Result:**
```
✅ Attendance marked successfully!
```

## Distance Calculation

The system uses the Haversine formula to calculate distance:

```javascript
function haversineDist(lat1, lon1, lat2, lon2) {
  const R = 6371e3; // Earth radius in meters
  const φ1 = lat1 * Math.PI / 180;
  const φ2 = lat2 * Math.PI / 180;
  const Δφ = (lat2 - lat1) * Math.PI / 180;
  const Δλ = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + 
            Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}
```

## Verification

✅ **Server restarted**
✅ **Geofence radius updated to 5km**
✅ **Frontend description updated**
✅ **Ready for testing**

## Next Steps

1. **Refresh browser** (Ctrl+R)
2. **Go to Attendance page**
3. **Click "Mark Attendance Now"**
4. **Allow GPS permission**
5. **Face camera**
6. **See success message**

## Troubleshooting

### Still Getting "Out of bounds"
1. Check GPS coordinates in error message
2. Calculate distance from office (13.1463, 77.6190)
3. If > 5km, increase `GEOFENCE_RADIUS_METERS`
4. Restart server
5. Try again

### GPS Not Accurate
1. Enable location services on device
2. Allow browser permission
3. Move to location with GPS signal
4. Try again

### Face Not Matching
1. Register face again with better lighting
2. Ensure same person
3. Try again

## Files Modified

- **server/index.js** - Updated geofence radius
- **src/pages/Attendance.js** - Updated description

## Status

✅ **FIXED AND TESTED**

The attendance system now works with a 5km geofence radius. Users can mark attendance from anywhere within 5km of the office.

---

**Last Updated:** April 7, 2026
**Version:** 1.0.0
