# HR Attendance System

A premium, modern web application for an HR attendance system featuring **GPS Geofencing** and **Facial Recognition**. Built with React, Vite, Node.js + Express, and SQLite.

## Core Features
1. **Face Biometric Registration**: Real-time webcam capture and face encoding using `@vladmandic/face-api`.
2. **Geofenced Proof of Attendance**: Employs Haversine distance formula to ensure check-ins physically occur within 100 meters of predefined office coordinates.
3. **Facial Authentication Context**: Matches live webcam stills with the database face 128-dimensional encodings.
4. **JWT Security**: Protected routes and securely authenticated API endpoints.

## Tech Stack
- **Frontend**: React (Vite), React Router, Axios, Lucide Icons
- **Backend**: Node.js, Express, SQLite
- **AI/ML**: `face-api.js` (Neural networks optimized for browser)
- **UI Design**: Hand-crafted Glassmorphism, Dark-mode first using premium gradients and responsive layouts.

## Directory Structure
```
c:\RC Labs Wiki\hr-attendance
 ├── backend/
 │   ├── server.js            # Express server (Authentication, Face matching, Haversine routing)
 │   ├── package.json
 │   └── db.sqlite            # Auto-generated SQLite Database file
 ├── frontend/
 │   ├── src/
 │   │   ├── pages/           # Admin, Login, Register, Attendance
 │   │   ├── App.jsx          # React router & Model pre-loading
 │   │   ├── main.jsx         # App Entrypoint
 │   │   └── index.css        # Premium Global Styling
 │   ├── public/models/       # Neural Network Weights for offline processing
 │   ├── package.json
 │   └── vite.config.js
```

## Running the Application
The application is pre-configured and both backend and frontend servers have been spun up automatically on your machine!

*   **Backend Server**: `http://localhost:5000` (Running in background)
*   **Web Portal**: `http://localhost:5173` (Running in background) 

Just visit [http://localhost:5173](http://localhost:5173) in your browser. 

**Workflow:**
1. Navigate to `/register` right from the portal. Enable your webcam and let the AI capture your biometrics.
2. Sign in via `/login`.
3. Check in via the **Attendance Dashboard** (grant Location and Camera permissions to the browser).
4. See all logs dynamically in the `/admin` view.

> [!CAUTION]
> The browser requires your permission to query GPS and initialize the webcam. Failing to grant these permissions natively will prevent attendance markers from being recorded.

> [!NOTE] 
> The mock office coordinates have been set to `12.9715987, 77.5945627` with a strict `100 m` radius. To adapt to your office's real coordinates, simply alter the `OFFICE_LAT` and `OFFICE_LON` values in `backend/server.js`.
