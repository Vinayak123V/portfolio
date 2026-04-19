const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' })); // High limit for base64 image
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

const db = new sqlite3.Database(path.join(__dirname, 'db.sqlite'), (err) => {
  if (err) {
    console.error('Error opening database', err.message);
  } else {
    db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            email TEXT UNIQUE,
            password TEXT,
            face_encoding TEXT
        )`);
    db.run(`CREATE TABLE IF NOT EXISTS attendance (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            date TEXT,
            check_in_time TEXT,
            latitude REAL,
            longitude REAL,
            image TEXT,
            status TEXT
        )`);
  }
});

const OFFICE_LAT = 13.1463; // Updated to match user's actual latitude
const OFFICE_LON = 77.6190; // Updated to match user's actual longitude
const GEOFENCE_RADIUS_METERS = 100;
const SECRET_KEY = "my_secret_key";

function haversineDist(lat1, lon1, lat2, lon2) {
  const R = 6371e3; // metres
  const φ1 = lat1 * Math.PI / 180;
  const φ2 = lat2 * Math.PI / 180;
  const Δφ = (lat2 - lat1) * Math.PI / 180;
  const Δλ = (lon2 - lon1) * Math.PI / 180;

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; 
}

function euclideanDistance(desc1, desc2) {
    if (!desc1 || !desc2) return 1.0;
    
    // Convert to arrays if they are objects (can happen with JSON serialization)
    const arr1 = Array.isArray(desc1) ? desc1 : Object.values(desc1);
    const arr2 = Array.isArray(desc2) ? desc2 : Object.values(desc2);
    
    if (arr1.length !== arr2.length) return 1.0;
    
    let sum = 0;
    for (let i = 0; i < arr1.length; i++) {
        let diff = arr1[i] - arr2[i];
        sum += diff * diff;
    }
    return Math.sqrt(sum);
}

// Routes
app.post('/api/auth/register', (req, res) => {
    const { name, email, password, face_encoding } = req.body;
    db.run('INSERT INTO users (name, email, password, face_encoding) VALUES (?, ?, ?, ?)',
        [name, email, password, JSON.stringify(face_encoding)], function(err) {
            if (err) return res.status(400).json({ error: err.message });
            res.json({ id: this.lastID, message: "User registered successfully!" });
    });
});

app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    db.get('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (err, user) => {
        if (err || !user) return res.status(401).json({ error: "Invalid credentials" });
        const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
    });
});

app.post('/mark-attendance', (req, res) => {
    const { token, image, latitude, longitude, descriptor } = req.body;

    let userId;
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        userId = decoded.id;
    } catch(e) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    const dist = haversineDist(OFFICE_LAT, OFFICE_LON, latitude, longitude);
    
    db.get('SELECT * FROM users WHERE id = ?', [userId], (err, user) => {
        if (err || !user) return res.status(400).json({ error: "User not found" });
        
        let storedDescriptor;
        try {
            storedDescriptor = JSON.parse(user.face_encoding);
        } catch(e) {
            return res.status(500).json({ error: "Stored encoding error" });
        }

        const faceDistance = descriptor ? euclideanDistance(descriptor, storedDescriptor) : 1.0;
        console.log("Calculated Face Distance:", faceDistance);
        
        let status = "Success";
        if (dist > GEOFENCE_RADIUS_METERS) {
            status = "Rejected (Out of bounds)";
        } else if (faceDistance > 0.85) { 
            // Increased threshold from 0.6 to 0.85 because TinyFaceDetector can be noisier under poor lighting
            status = "Rejected (Face mismatch)";
        }

        const date = new Date().toISOString().split('T')[0];
        const time = new Date().toISOString().split('T')[1];

        db.run('INSERT INTO attendance (user_id, date, check_in_time, latitude, longitude, image, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [userId, date, time, latitude, longitude, image, status], function(err) {
                if (err) return res.status(500).json({ error: err.message });
                if (status === "Success") {
                    res.json({ message: "Attendance marked successfully!" });
                } else {
                    res.status(400).json({ error: status, distance: Math.round(dist) });
                }
        });
    });
});

app.get('/api/attendance', (req, res) => {
    const { token } = req.query;
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        db.all('SELECT * FROM attendance WHERE user_id = ? ORDER BY id DESC', [decoded.id], (err, rows) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(rows);
        });
    } catch(e) {
        return res.status(401).json({ error: "Unauthorized" });
    }
});

app.get('/api/admin/attendance', (req, res) => {
    db.all(`SELECT a.*, u.name FROM attendance a JOIN users u ON a.user_id = u.id ORDER BY a.id DESC`, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

app.listen(5000, () => console.log('Backend running on port 5000'));
