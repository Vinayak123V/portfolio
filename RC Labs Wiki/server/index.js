const express = require('express');
const cors    = require('cors');
const bcrypt  = require('bcryptjs');
const jwt     = require('jsonwebtoken');
const fs      = require('fs');
const path    = require('path');
const sqlite3 = require('sqlite3').verbose();
const axios   = require('axios');

const app = express();
const PORT = 5000;
const JWT_SECRET = 'rclabs_wiki_secret_2026';

// ── Data file paths ──
const DATA_DIR    = path.join(__dirname, 'data');
const USERS_FILE  = path.join(DATA_DIR, 'users.json');
const PROJ_FILE   = path.join(DATA_DIR, 'projects.json');
const HIST_FILE   = path.join(DATA_DIR, 'project_history.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR);

// ── Persistence helpers ──
const readJSON  = (file, fallback) => {
  try { return JSON.parse(fs.readFileSync(file, 'utf8')); }
  catch { return fallback; }
};
const writeJSON = (file, data) => fs.writeFileSync(file, JSON.stringify(data, null, 2));

// Load or init stores
let users    = readJSON(USERS_FILE, []);
let projects = readJSON(PROJ_FILE, getDefaultProjects());
let history  = readJSON(HIST_FILE, []);

function saveUsers()    { writeJSON(USERS_FILE, users); }
function saveProjects() { writeJSON(PROJ_FILE, projects); }
function saveHistory()  { writeJSON(HIST_FILE, history); }

const addHistory = (action, projectId, projectName, userName, extra = {}) => {
  history.unshift({ id: Date.now(), action, projectId, projectName, by: userName, at: new Date().toISOString(), ...extra });
  if (history.length > 500) history = history.slice(0, 500);
  saveHistory();
};

// ── Middleware ──
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// ── Auth helpers ──
const findUser = (email) => users.find(u => u.email.toLowerCase() === email.toLowerCase());

const generateToken = (user) =>
  jwt.sign({ id: user.id, email: user.email, name: user.name }, JWT_SECRET, { expiresIn: '7d' });

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

// ════════════════════════════════════════
//  AUTH ROUTES
// ════════════════════════════════════════

app.post('/api/register', async (req, res) => {
  const { name, email, password, department } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ message: 'Name, email and password are required' });
  if (password.length < 6)
    return res.status(400).json({ message: 'Password must be at least 6 characters' });
  if (findUser(email))
    return res.status(409).json({ message: 'An account with this email already exists' });

  const hashed = await bcrypt.hash(password, 10);
  const user = { id: Date.now().toString(), name, email, department: department || '', password: hashed, createdAt: new Date() };
  users.push(user);
  saveUsers();

  const token = generateToken(user);
  res.status(201).json({ token, user: { id: user.id, name: user.name, email: user.email, department: user.department } });
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: 'Email and password are required' });

  const user = findUser(email);
  if (!user) return res.status(401).json({ message: 'No account found with this email' });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ message: 'Incorrect password' });

  const token = generateToken(user);
  res.json({ token, user: { id: user.id, name: user.name, email: user.email, department: user.department } });
});

app.get('/api/me', authMiddleware, (req, res) => {
  const user = users.find(u => u.id === req.user.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json({ id: user.id, name: user.name, email: user.email, department: user.department });
});

app.post('/api/logout', authMiddleware, (_req, res) => {
  res.json({ message: 'Logged out successfully' });
});

// ════════════════════════════════════════
//  PROJECTS ROUTES
// ════════════════════════════════════════

// GET all projects
app.get('/api/projects', authMiddleware, (_req, res) => {
  res.json(projects);
});

// GET single project
app.get('/api/projects/:id', authMiddleware, (req, res) => {
  const project = projects.find(p => p.id === Number(req.params.id));
  if (!project) return res.status(404).json({ message: 'Project not found' });
  res.json(project);
});

// POST create project
app.post('/api/projects', authMiddleware, (req, res) => {
  const maxId = projects.length > 0 ? Math.max(...projects.map(p => p.id)) : 0;
  const newProject = {
    ...req.body,
    id: maxId + 1,
    createdAt: new Date(),
    createdBy: req.user.id
  };
  projects.push(newProject);
  saveProjects();
  addHistory('created', newProject.id, newProject.name, req.user.name);
  res.status(201).json(newProject);
});

// PUT update project
app.put('/api/projects/:id', authMiddleware, (req, res) => {
  const idx = projects.findIndex(p => p.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ message: 'Project not found' });

  const old = projects[idx];
  // Strip internal meta field before saving
  const { _historyAction, ...projectData } = req.body;

  const isDeadlineExtended = projectData.deadline && projectData.deadline !== old.deadline;
  const action = _historyAction || (isDeadlineExtended ? 'deadline_extended' : 'updated');
  const extra  = isDeadlineExtended ? { oldDeadline: old.deadline, newDeadline: projectData.deadline } : {};

  projects[idx] = { ...old, ...projectData, id: old.id };
  saveProjects();
  addHistory(action, old.id, old.name, req.user.name, extra);

  res.json(projects[idx]);
});

// DELETE project
app.delete('/api/projects/:id', authMiddleware, (req, res) => {
  const idx = projects.findIndex(p => p.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ message: 'Project not found' });
  const removed = projects[idx];
  projects.splice(idx, 1);
  saveProjects();
  addHistory('deleted', removed.id, removed.name, req.user.name);
  res.json({ message: 'Project deleted' });
});

// ════════════════════════════════════════
//  HISTORY ROUTES
// ════════════════════════════════════════

// GET all history (optionally filter by projectId)
app.get('/api/history', authMiddleware, (req, res) => {
  const { projectId } = req.query;
  if (projectId) {
    return res.json(history.filter(h => h.projectId === Number(projectId)));
  }
  res.json(history);
});

// DELETE clear all history
app.delete('/api/history', authMiddleware, (req, res) => {
  history = [];
  saveHistory();
  res.json({ message: 'History cleared' });
});

// ════════════════════════════════════════
//  ATTENDANCE ROUTES (INTEGRATED)
// ════════════════════════════════════════

const OFFICE_LAT = 13.1463; 
const OFFICE_LON = 77.6190; 
const GEOFENCE_RADIUS_METERS = 20000; // 20km radius

const attendanceDb = new sqlite3.Database(path.join(__dirname, 'attendance_db.sqlite'), (err) => {
  if (err) {
    console.error('Error opening attendance db', err.message);
  } else {
    attendanceDb.run(`CREATE TABLE IF NOT EXISTS attendance (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id TEXT,
            user_name TEXT,
            date TEXT,
            check_in_time TEXT,
            check_out_time TEXT,
            latitude REAL,
            longitude REAL,
            location_name TEXT,
            image TEXT,
            status TEXT
        )`);
    // Add indexes for performance
    attendanceDb.run(`CREATE INDEX IF NOT EXISTS idx_attendance_user ON attendance (user_id)`);
    attendanceDb.run(`CREATE INDEX IF NOT EXISTS idx_attendance_date ON attendance (date)`);
    
    // Auto-migrate schema: add check_out_time if it doesn't exist
    attendanceDb.run(`ALTER TABLE attendance ADD COLUMN check_out_time TEXT`, (err) => {
      // Ignore errors if column already exists
      if (err && !err.message.includes('duplicate column name')) {
        console.log('Migration note:', err.message);
      } else if (!err) {
        console.log('Successfully added check_out_time column to database schema.');
      }
    });
  }
});

function haversineDist(lat1, lon1, lat2, lon2) {
  const R = 6371e3; 
  const φ1 = lat1 * Math.PI / 180;
  const φ2 = lat2 * Math.PI / 180;
  const Δφ = (lat2 - lat1) * Math.PI / 180;
  const Δλ = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; 
}

function euclideanDistance(desc1, desc2) {
    if (!desc1 || !desc2) return 1.0;
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

// Ensure the user helper function is available to find by ID
const findUserById = (id) => users.find(u => String(u.id) === String(id));

app.post('/api/attendance/register-face', authMiddleware, (req, res) => {
    const { face_encoding } = req.body;
    console.log('Register face request received. User ID:', req.user.id);
    console.log('Face encoding received:', face_encoding ? `${face_encoding.length} values` : 'MISSING');
    
    if (!face_encoding) return res.status(400).json({ error: "Missing face descriptor" });
    
    const user = findUserById(req.user.id);
    if (!user) {
        console.log('User not found:', req.user.id);
        return res.status(404).json({ error: "User not found" });
    }
    
    user.face_encoding = face_encoding;
    saveUsers();
    console.log('Face registered successfully for user:', user.name);
    
    res.json({ message: "Face registered successfully!" });
});

app.post('/api/attendance/mark', (req, res) => {
    const { token, image, latitude, longitude, descriptor, location_name, action = 'login' } = req.body;
    console.log(`Mark attendance request received (${action})`);
    let userId;
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        userId = decoded.id;
    } catch(e) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    const user = findUserById(userId);
    if (!user) return res.status(400).json({ error: "User not found" });
        
    let storedDescriptor = user.face_encoding;
    if (!storedDescriptor) {
        return res.status(400).json({ error: "No face registered on your Wiki account. Please register your face first." });
    }
    const faceDist = descriptor ? euclideanDistance(descriptor, storedDescriptor) : 1.0;
    if (faceDist > 0.6) {
        return res.status(400).json({ error: "Face verification failed. Please ensure your face is clearly visible." });
    }

    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];
    const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });

    if (action === 'logout') {
        // Find the latest record for this user that hasn't checked out yet
        attendanceDb.get('SELECT * FROM attendance WHERE user_id = ? AND check_out_time IS NULL ORDER BY id DESC LIMIT 1', [userId], (err, row) => {
            if (err) return res.status(500).json({ error: err.message });
            if (!row) return res.status(400).json({ error: "No active login found to logout from." });

            attendanceDb.run('UPDATE attendance SET check_out_time = ?, status = "Logout" WHERE id = ?', [timeStr, row.id], function(err) {
                if (err) return res.status(500).json({ error: err.message });
                res.json({ message: "Logout successful!", time: timeStr });
            });
        });
    } else {
        // Standard Login
        attendanceDb.run(
            `INSERT INTO attendance (user_id, user_name, date, check_in_time, latitude, longitude, location_name, image, status) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [userId, user.name, dateStr, timeStr, latitude, longitude, location_name || 'Unknown', image, 'Login'],
            function(err) {
                if (err) return res.status(500).json({ error: err.message });
                res.json({ id: this.lastID, message: "Attendance marked successfully!", time: timeStr });
            }
        );
    }
});

app.get('/api/employees', authMiddleware, (req, res) => {
    // Only return users who have registered their face
    const registeredUsers = users.filter(u => u.face_encoding);
    const employeeList = registeredUsers.map(u => ({
        id: u.id,
        name: u.name,
        department: u.department,
        email: u.email
    }));
    res.json(employeeList);
});

app.get('/api/attendance/history', (req, res) => {
    const { token, year, month } = req.query;
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        let query = 'SELECT * FROM attendance WHERE user_id = ?';
        let params = [String(decoded.id)];

        if (year) { query += " AND strftime('%Y', date) = ?"; params.push(year); }
        if (month) { query += " AND strftime('%m', date) = ?"; params.push(month.padStart(2, '0')); }

        query += ' ORDER BY id DESC LIMIT 100';

        attendanceDb.all(query, params, (err, rows) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(rows);
        });
    } catch (err) {
        res.status(401).json({ error: 'Invalid token' });
    }
});

app.get('/api/attendance/admin', (req, res) => {
    const { userId, year, month } = req.query;
    let query = 'SELECT * FROM attendance';
    let params = [];
    let conditions = [];

    if (userId) { conditions.push('user_id = ?'); params.push(userId); }
    if (year) { conditions.push("strftime('%Y', date) = ?"); params.push(year); }
    if (month) { conditions.push("strftime('%m', date) = ?"); params.push(month.padStart(2, '0')); }

    if (conditions.length > 0) {
        query += ' WHERE ' + conditions.join(' AND ');
    }
    
    query += ' ORDER BY id DESC LIMIT 500';

    attendanceDb.all(query, params, (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });

        // Map names if needed (optimized lookup)
        const mappedRows = rows.map(r => {
           const name = (r.user_name && r.user_name !== 'Unknown User') ? r.user_name : (findUserById(r.user_id)?.name || 'Unknown User');
           return { ...r, name };
        });
        res.json(mappedRows);
    });
});

app.get('/api/attendance/summary', authMiddleware, (req, res) => {
    const today = new Date().toISOString().split('T')[0];
    const stats = {
        totalToday: 0,
        successToday: 0,
        failedToday: 0,
        uniqueUsersToday: 0
    };

    attendanceDb.get('SELECT COUNT(*) as count FROM attendance WHERE date = ?', [today], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        stats.totalToday = row.count;

        attendanceDb.get('SELECT COUNT(*) as count FROM attendance WHERE date = ? AND status = "Success"', [today], (err, row) => {
            if (err) return res.status(500).json({ error: err.message });
            stats.successToday = row.count;
            stats.failedToday = stats.totalToday - stats.successToday;

            attendanceDb.get('SELECT COUNT(DISTINCT user_id) as count FROM attendance WHERE date = ?', [today], (err, row) => {
                if (err) return res.status(500).json({ error: err.message });
                stats.uniqueUsersToday = row.count;
                res.json(stats);
            });
        });
    });
});

// ════════════════════════════════════════
//  GOOGLE MAPS GEOCODING ENDPOINT
// ════════════════════════════════════════

app.get('/api/geocode', async (req, res) => {
    const { latitude, longitude } = req.query;
    if (!latitude || !longitude) return res.status(400).json({ error: "Missing latitude or longitude" });
    
    // Attempt with multiple keys sequentially with shorter timeouts
    const keys = [
        'AIzaSyD-pS3jWAyGHwuQKLeOmwws0ZpHcX5_8-w', // Backup key (looks valid)
        'AIzaSyBvG8-X3M3... (placeholder for other keys if any)'
    ];

    for (const key of keys) {
        if (key.includes('...')) continue;
        try {
            const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${key}`;
            const response = await axios.get(url, { timeout: 3000 });
            if (response.data.status === 'OK' && response.data.results.length > 0) {
                const address = response.data.results[0].formatted_address;
                return res.json({ location: address, source: 'google' });
            }
        } catch (err) {
            console.error(`Geocoding failed with Google key ${key.substring(0, 5)}...:`, err.message);
        }
    }

    // Secondary fallback: OpenStreetMap (Nominatim) - Free and no key required for low volume
    try {
        console.log('Attempting Nominatim fallback...');
        const nominatimUrl = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
        const response = await axios.get(nominatimUrl, { 
            headers: { 'User-Agent': 'RC-Labs-Wiki-Attendance-System' },
            timeout: 4000 
        });
        if (response.data && response.data.display_name) {
            console.log('Location found via Nominatim:', response.data.display_name);
            return res.json({ location: response.data.display_name, source: 'nominatim' });
        }
    } catch (err) {
        console.error('Nominatim fallback failed:', err.message);
    }

    // Default fallback to coordinates
    res.json({ 
        location: `${parseFloat(latitude).toFixed(4)}, ${parseFloat(longitude).toFixed(4)}`,
        source: 'coordinates'
    });
});

// ════════════════════════════════════════
//  DEFAULT PROJECT DATA
// ════════════════════════════════════════
function getDefaultProjects() {
  return [
    {
      id: 1, name: 'Next-Gen BMS Platform', category: 'Hardware', status: 'Active',
      startDate: '2025-08-15', deadline: '2026-06-30', projectLead: 'Dr. Rajesh Kumar',
      teamMembers: ['Sarah Chen', 'Michael Brown', 'Priya Sharma', 'David Lee'],
      description: 'Development of next-generation Battery Management System with enhanced AI-driven predictive maintenance capabilities and improved thermal management.',
      objectives: ['Implement advanced machine learning algorithms for SOC/SOH estimation', 'Reduce power consumption by 30%', 'Support up to 200 cells in series configuration', 'Achieve automotive-grade safety certification (ISO 26262)'],
      progress: 65
    },
    {
      id: 2, name: 'EV Two-Wheeler BMS', category: 'Hardware', status: 'Active',
      startDate: '2025-06-01', deadline: '2026-03-31', projectLead: 'Anita Desai',
      teamMembers: ['John Smith', 'Wei Zhang', 'Aisha Patel', 'Carlos Rodriguez'],
      description: 'Compact BMS solution specifically designed for electric two-wheelers and three-wheelers with cost optimization focus.',
      objectives: ['Reduce BOM cost by 25% compared to current solution', 'Support 48V and 60V battery packs', 'Integrate IoT connectivity for fleet management', 'Achieve IP67 rating for weather resistance'],
      progress: 80
    },
    {
      id: 3, name: 'Energy Storage System (ESS) BMS', category: 'Hardware', status: 'Withheld',
      startDate: '2025-11-01', deadline: '2026-09-30', projectLead: 'Thomas Anderson',
      teamMembers: ['Lisa Wang', 'Ahmed Hassan', 'Maria Garcia'],
      description: 'Large-scale BMS for stationary energy storage applications including solar integration and grid stabilization.',
      objectives: ['Support battery packs up to 1 MWh capacity', 'Implement advanced grid integration features', 'Develop cloud-based monitoring dashboard', 'Ensure 20+ year operational lifespan'],
      progress: 15, withheldReason: 'Awaiting regulatory approval for grid integration features'
    },
    {
      id: 4, name: 'BMS Firmware v3.0', category: 'Software', status: 'Active',
      startDate: '2025-07-20', deadline: '2026-05-15', projectLead: "Kevin O'Brien",
      teamMembers: ['Yuki Tanaka', 'Fatima Ali', 'Robert Johnson', 'Nina Patel', 'Alex Kim'],
      description: 'Major firmware upgrade with enhanced safety features, OTA update capability, and improved diagnostics.',
      objectives: ['Implement secure OTA firmware updates', 'Add advanced fault detection algorithms', 'Improve CAN communication efficiency', 'Reduce boot time by 50%'],
      progress: 55
    },
    {
      id: 5, name: 'Battery Analytics Platform', category: 'Software', status: 'Active',
      startDate: '2025-05-10', deadline: '2026-02-28', projectLead: 'Sophia Martinez',
      teamMembers: ['James Wilson', 'Mei Lin', 'Omar Farooq', 'Emma Thompson'],
      description: 'Cloud-based analytics platform for battery performance monitoring, predictive maintenance, and fleet management.',
      objectives: ['Real-time battery health monitoring dashboard', 'Predictive maintenance alerts', 'Historical data analysis and reporting', 'Multi-tenant architecture for different customers'],
      progress: 75
    },
    {
      id: 6, name: 'Ultra-Fast Charging BMS', category: 'Hardware', status: 'Aborted',
      startDate: '2025-03-01', deadline: '2025-12-31', projectLead: 'Daniel Park',
      teamMembers: ['Grace Lee', 'Mohammed Khan'],
      description: 'BMS designed for ultra-fast charging applications with advanced thermal management.',
      objectives: ['Support 350kW+ charging rates', 'Maintain battery temperature during fast charging', 'Minimize charging time to under 15 minutes'],
      progress: 30, abortReason: 'Market demand shifted; technology not yet mature for mass production'
    },
    {
      id: 7, name: 'Mobile Fleet Management App', category: 'Software', status: 'Active',
      startDate: '2025-09-01', deadline: '2026-04-30', projectLead: 'Rachel Green',
      teamMembers: ['Tom Hardy', 'Priya Singh', 'Lucas Brown'],
      description: 'Native mobile application for fleet operators to monitor and manage EV batteries on the go.',
      objectives: ['Real-time battery monitoring on mobile devices', 'Push notifications for critical alerts', 'Offline mode with data sync', 'Support for iOS and Android platforms'],
      progress: 40
    },
    {
      id: 8, name: 'AI Predictive Maintenance Engine', category: 'Software', status: 'Withheld',
      startDate: '2025-10-15', deadline: '2026-08-31', projectLead: 'Dr. Alan Turing',
      teamMembers: ['Maya Patel', 'Chris Evans', 'Zara Khan', 'Leo Martinez'],
      description: 'Machine learning engine for predicting battery failures and optimizing maintenance schedules.',
      objectives: ['Predict battery failures 30 days in advance', 'Reduce maintenance costs by 40%', 'Integrate with existing BMS systems', 'Support multiple battery chemistries'],
      progress: 20, withheldReason: 'Pending additional funding approval and data collection phase'
    },
    {
      id: 101, name: 'Modular BMS Gen 2', category: 'Hardware', status: 'Completed',
      startDate: '2024-06-01', completedDate: '2025-12-15', projectLead: 'Dr. Sarah Johnson',
      teamMembers: ['Mark Wilson', 'Emily Chen', 'Raj Patel', 'Lisa Anderson', 'Tom Brown'],
      description: 'Second generation modular BMS platform with improved scalability and cost efficiency.',
      objectives: ['Successfully deployed in 500+ electric vehicles', 'Achieved 35% cost reduction compared to Gen 1', 'Obtained UL and CE certifications', 'Reduced assembly time by 40%'],
      achievements: ['Exceeded deployment target by 25%', 'Won Industry Innovation Award 2025', 'Customer satisfaction rating: 4.8/5']
    },
    {
      id: 102, name: 'LFP Battery Optimization', category: 'Software', status: 'Completed',
      startDate: '2024-10-01', completedDate: '2025-10-31', projectLead: 'Dr. Michael Zhang',
      teamMembers: ['Anna Kowalski', 'James Lee', 'Sofia Martinez', 'David Kim'],
      description: 'Specialized algorithms for LiFePO4 (LFP) battery chemistry optimization.',
      objectives: ['Improved SOC estimation accuracy to 98%', 'Extended battery cycle life by 15%', 'Developed temperature-adaptive charging profiles', 'Published 2 research papers on findings'],
      achievements: ['Patent filed for novel algorithm', 'Adopted by 3 major EV manufacturers', 'Reduced charging time by 20%']
    }
  ];
}

app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
