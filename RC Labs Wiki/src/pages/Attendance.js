import { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import * as faceapi from '@vladmandic/face-api';
import { Camera, MapPin, CheckCircle, AlertCircle, LogOut, User, Building, Mail, ArrowLeft, Users } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Attendance() {
  const { logout } = useAuth();
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedUserForHistory, setSelectedUserForHistory] = useState(null);
  const [location, setLocation] = useState(null);

  const calculateDuration = (start, end) => {
    if (!start || !end) return '-';
    try {
      const parseTime = (t) => {
        if (!t) return 0;
        const parts = t.trim().split(' ');
        const timePart = parts[0];
        const modifier = parts.length > 1 ? parts[1].toLowerCase() : '';
        
        let [hours, minutes, seconds] = timePart.split(':');
        hours = parseInt(hours || 0, 10);
        minutes = parseInt(minutes || 0, 10);
        seconds = parseInt(seconds || 0, 10);
        
        if (modifier === 'pm' && hours < 12) hours += 12;
        if (modifier === 'am' && hours === 12) hours = 0;
        
        const d = new Date(2000, 0, 1, hours, minutes, seconds);
        return d.getTime();
      };
      const diff = (parseTime(end) - parseTime(start)) / 1000;
      if (diff < 0) return '-';
      const h = Math.floor(diff / 3600);
      const m = Math.floor((diff % 3600) / 60);
      return `${h}h ${m}m`;
    } catch (err) {
      console.error(err);
      return '-';
    }
  };

  const handleClockOutRow = async (recordId) => {
    // 1. Redirect view to camera
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMessage("Please look at the camera to verify your identity for Logout...");
    setError(null);
    setLoading(true);

    try {
      let detections = null;
      // 2. Retry face detection for up to 3 seconds for better UX
      for (let i = 0; i < 10; i++) {
        detections = await faceapi.detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions({ inputSize: 224, scoreThreshold: 0.5 }))
                                  .withFaceLandmarks()
                                  .withFaceDescriptor();
        if (detections) break;
        await new Promise(r => setTimeout(r, 300)); // wait 0.3s before retry
      }

      if (!detections) {
        setLoading(false);
        setMessage(null);
        return setError("Face verify required to Logout. Please face the camera and try again.");
      }

      const token = localStorage.getItem('rc_token');
      await axios.post('http://localhost:5000/api/attendance/mark', {
        token,
        action: 'logout',
        descriptor: Array.from(detections.descriptor)
      });

      setMessage("Logout successful! Your shift duration has been recorded.");
      if (selectedUserForHistory) fetchUserHistory(selectedUserForHistory.id);
    } catch (err) {
      setError(err.response?.data?.error || "Logout failed. Please check the backend connection.");
      setMessage(null);
    }
    setLoading(false);
  };
  
  // This uses the wiki's auth token for now, or you can manage separate token if you integrated the auth.
  // Actually, wait, let's keep it simple: we use the local storage token from Wiki since user is logged in
  const [showPopup, setShowPopup] = useState(false);
  const videoRef = useRef();
  const canvasRef = useRef();

  const handleHomeRedirect = () => {
    window.location.href = '/';
  };

  const secureLogout = async () => {
    setLoading(true);
    setError(null);
    try {
      // 1. Detect face
      const detections = await faceapi.detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions({ inputSize: 224, scoreThreshold: 0.5 }))
                                      .withFaceLandmarks()
                                      .withFaceDescriptor();
      if (!detections) {
        setLoading(false);
        return setError("Face not recognized. Please face the camera to verify.");
      }

      // 2. Mark attendance (Final/Logout)
      const token = localStorage.getItem('rc_token');
      const descriptor = Array.from(detections.descriptor);
      
      const coords = await getCoordinates();
      const locationName = await getLocationName(coords.latitude, coords.longitude);
      
      await axios.post('http://localhost:5000/api/attendance/mark', {
        token,
        latitude: coords.latitude,
        longitude: coords.longitude,
        descriptor,
        image: captureImage(),
        location_name: locationName,
        status_note: 'Secure Verification'
      });

      // 3. Show Success Popup
      setShowPopup(true);
      
      // 4. Wait 2.5 seconds then redirect to Home (without logging out)
      setTimeout(() => {
        handleHomeRedirect();
      }, 2500);

    } catch (err) {
      setError(err.response?.data?.error || "Verification failed. Please try again.");
    }
    setLoading(false);
  };

  useEffect(() => {
    const loadModels = async () => {
      try {
        const MODEL_URL = '/models';
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
          faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
          faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL)
        ]);
        setModelsLoaded(true);
      } catch (e) {
        console.error("Error loading models", e);
        setError("Failed to load Face AI models. Ensure they are in the public/models folder.");
      }
    };
    loadModels();
  }, []);

  useEffect(() => {
    if (modelsLoaded) {
      startVideo();
      fetchEmployees();
    }
    return () => stopVideo();
  }, [modelsLoaded]);

  const fetchEmployees = async () => {
    try {
      const token = localStorage.getItem('rc_token');
      const res = await axios.get('http://localhost:5000/api/employees', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEmployees(res.data);
    } catch (err) {
      console.error("Error fetching employees", err);
    }
  };

  useEffect(() => {
    if (selectedUserForHistory) {
      fetchUserHistory(selectedUserForHistory.id);
    }
  }, [selectedUserForHistory]);

  const fetchUserHistory = async (userId) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/attendance/admin?userId=${userId}`);
      setHistory(res.data);
    } catch (err) {
      console.error("Error fetching user history", err);
    }
  };

  const startVideo = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      })
      .catch((err) => {
        console.error("error:", err);
        setError("Camera permission denied or camera not found.");
      });
  };

  const stopVideo = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
    }
  };

  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem('rc_token');
      if (!token) return;
      const res = await axios.get(`http://localhost:5000/api/attendance/history?token=${token}`);
      // By default, we might want to show the logged-in user's history if they haven't selected anyone
      // But for this card-based design, we'll wait for a card click.
    } catch (err) {}
  };

  const captureImage = () => {
    const video = videoRef.current;
    if (!video) return null;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);
    return canvas.toDataURL('image/jpeg', 0.8);
  };

  const getCoordinates = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject("Geolocation not supported");
      }
      navigator.geolocation.getCurrentPosition(
        position => resolve(position.coords),
        err => reject("Please enable location services and allow permission")
      );
    });
  };

  const getLocationName = async (latitude, longitude) => {
    try {
      console.log('Fetching location name from backend for:', latitude, longitude);
      
      const response = await axios.get(`http://localhost:5000/api/geocode?latitude=${latitude}&longitude=${longitude}`);
      
      console.log('Backend geocoding response:', response.data);
      
      if (response.data.location) {
        console.log('Location name found:', response.data.location);
        return response.data.location;
      }
      
      console.log('No location found, using coordinates');
      return `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
    } catch (err) {
      console.error('Error fetching location name:', err.message);
      return `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
    }
  };

  const markAttendance = async () => {
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      // Ensure video is ready
      if (!videoRef.current || !videoRef.current.srcObject) {
        setLoading(false);
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

      // 1. Get GPS (necessary for geocoding)
      const coords = await getCoordinates();
      console.log('GPS acquired:', coords.latitude, coords.longitude);

      // 2. Run Geocoding and Face Detection in PARALLEL to save time
      console.log('Detecting face and resolving location in parallel...');
      const [locationName, detections] = await Promise.all([
        getLocationName(coords.latitude, coords.longitude),
        faceapi.detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions({ inputSize: 224, scoreThreshold: 0.5 }))
               .withFaceLandmarks()
               .withFaceDescriptor()
      ]);

      setLocation({ lat: coords.latitude, lon: coords.longitude, name: locationName });
      console.log('Location resolved:', locationName);
                                      
      if (!detections) {
        setLoading(false);
        return setError("No face detected in webcam. Please adjust lighting and face the camera directly.");
      }
      
      const descriptor = Array.from(detections.descriptor);
      console.log('Face detected, descriptor length:', descriptor.length);
      
      // 3. Capture image for logs
      const base64Image = captureImage();

      // 4. Send to Backend
      const token = localStorage.getItem('rc_token');
      if (!token) {
        setLoading(false);
        return setError('Not logged in. Please log in first.');
      }

      console.log('Marking attendance with token:', token.substring(0, 20) + '...');
      const res = await axios.post('http://localhost:5000/api/attendance/mark', {
        token,
        latitude: coords.latitude,
        longitude: coords.longitude,
        descriptor,
        image: base64Image,
        location_name: locationName
      });

      console.log('Attendance response:', res.data);
      setMessage(res.data.message);
      fetchHistory();

    } catch (err) {
      console.error('Mark attendance error:', err);
      if (typeof err === "string") setError(err);
      else {
        const errorMsg = err.response?.data?.error || err.message || 'Failed to mark attendance';
        setError(errorMsg);
      }
    }
    setLoading(false);
  };

  const registerFace = async () => {
    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      // Ensure video is ready
      if (!videoRef.current || !videoRef.current.srcObject) {
        setLoading(false);
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

      console.log('Video ready, detecting face...');
      const detections = await faceapi.detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions({ inputSize: 224, scoreThreshold: 0.5 }))
                                      .withFaceLandmarks()
                                      .withFaceDescriptor();
      if (!detections) {
        setLoading(false);
        return setError("No face detected. Please face the camera to register.");
      }
      
      const descriptor = Array.from(detections.descriptor);
      const token = localStorage.getItem('rc_token');
      if (!token) {
        setLoading(false);
        return setError('Not logged in. Please log in first.');
      }
      
      console.log('Registering face with token:', token.substring(0, 20) + '...');
      console.log('Descriptor length:', descriptor.length);
      
      const res = await axios.post('http://localhost:5000/api/attendance/register-face', {
        face_encoding: descriptor
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      console.log('Face registration response:', res.data);
      setMessage(res.data.message || "Face registered to your Wiki account successfully!");
      fetchEmployees(); // Refresh the card grid immediately
    } catch (err) {
      console.error('Face registration error:', err);
      const errorMsg = err.response?.data?.error || err.message || 'Failed to register face.';
      setError(errorMsg);
    }
    setLoading(false);
  };

  if (!modelsLoaded) {
    return (
      <div style={{ padding: '3rem', textAlign: 'center', background: 'white', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
        <h2>Loading Face AI Models...</h2>
        <p style={{ color: '#64748b' }}>Please wait while we initialize the neural networks for security check.</p>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
      
      {/* Header Section */}
      <div style={{ background: 'linear-gradient(135deg, #0066cc 0%, #0052a3 100%)', padding: '2.5rem', borderRadius: '12px', color: 'white', boxShadow: '0 8px 24px rgba(0, 102, 204, 0.15)' }}>
        <h1 style={{ marginTop: 0, marginBottom: '0.5rem', fontSize: '2rem', fontWeight: 700 }}>Daily Attendance</h1>
        <p style={{ marginBottom: 0, opacity: 0.95, fontSize: '1rem' }}>Face Recognition & GPS Verification System</p>
      </div>

      {/* Main Content */}
      <div style={{ background: 'white', padding: '2.5rem', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', display: 'flex', gap: '3rem', flexWrap: 'wrap' }}>
        
        {/* Left Section - Controls */}
        <div style={{ flex: '1', minWidth: '320px' }}>
          <h2 style={{ marginTop: 0, marginBottom: '1rem', fontSize: '1.4rem', color: '#1e293b' }}>Mark Attendance</h2>
          <p style={{ color: '#64748b', marginBottom: '1.5rem', lineHeight: '1.6', fontSize: '0.95rem' }}>
            Verify your attendance using facial recognition and GPS location. Ensure you are within 20km of the office.
          </p>

          {/* Status Messages */}
          {error && (
            <div style={{ background: '#fef2f2', color: '#dc2626', padding: '1rem', borderRadius: '8px', marginBottom: '1rem', display: 'flex', alignItems: 'flex-start', gap: '0.75rem', border: '1px solid #fecaca' }}>
              <AlertCircle size={20} style={{ marginTop: '0.1rem', flexShrink: 0 }} />
              <div>{error}</div>
            </div>
          )}
          {message && (
            <div style={{ background: '#f0fdf4', color: '#16a34a', padding: '1rem', borderRadius: '8px', marginBottom: '1rem', display: 'flex', alignItems: 'flex-start', gap: '0.75rem', border: '1px solid #bbf7d0' }}>
              <CheckCircle size={20} style={{ marginTop: '0.1rem', flexShrink: 0 }} />
              <div>{message}</div>
            </div>
          )}

          {/* Status Box */}
          <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem', color: '#475569', fontWeight: 500 }}>
              <MapPin size={18} style={{ color: '#0066cc' }} />
              <span>GPS Status:</span>
              {location ? (
                <span style={{color: '#16a34a', fontWeight: 600 }}>✓ Acquired</span>
              ) : (
                <span style={{color: '#dc2626', fontWeight: 600 }}>Pending</span>
              )}
            </div>
            {location && (
              <div style={{ marginLeft: '2rem', fontSize: '0.9rem', color: '#64748b' }}>
                {location.name}
              </div>
            )}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.75rem', color: '#475569', fontWeight: 500 }}>
              <Camera size={18} style={{ color: '#0066cc' }} />
              <span>Camera Status:</span>
              <span style={{color: '#16a34a', fontWeight: 600 }}>✓ Active</span>
            </div>
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
            <button 
              onClick={markAttendance} 
              disabled={loading} 
              style={{ 
                width: '100%',
                background: loading ? '#cbd5e1' : '#0066cc', 
                color: 'white', 
                border: 'none', 
                padding: '1rem', 
                borderRadius: '8px', 
                fontSize: '1rem', 
                fontWeight: 600, 
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s',
                boxShadow: loading ? 'none' : '0 4px 12px rgba(0, 102, 204, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
              }}
            >
              {loading ? '⏳ Processing...' : <><CheckCircle size={20} /> Mark Attendance</>}
            </button>
            
            <button 
              onClick={() => {
                document.getElementById('directory-section')?.scrollIntoView({ behavior: 'smooth' });
                setError("Please select your profile from the Registered Profiles below to securely Logout.");
              }} 
              disabled={loading} 
              style={{ 
                width: '100%',
                background: '#f8fafc', 
                color: '#64748b', 
                border: '2px solid #e2e8f0', 
                padding: '1rem', 
                borderRadius: '8px', 
                fontSize: '1rem', 
                fontWeight: 600, 
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
              }}
            >
              <LogOut size={20} /> Logout
            </button>

            <button 
              onClick={registerFace} 
              disabled={loading} 
              style={{ 
                width: '100%',
                background: '#f1f5f9', 
                color: '#334155', 
                border: '1px solid #cbd5e1',
                padding: '1rem', 
                borderRadius: '8px', 
                fontSize: '1rem', 
                fontWeight: 600, 
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s',
                opacity: loading ? 0.7 : 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
              }}
            >
              <Camera size={18} /> Register Face
            </button>
          </div>
        </div>

        {/* Right Section - Camera */}
        <div style={{ flex: '1', minWidth: '320px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '100%', maxWidth: '400px' }}>
            <div style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '0.75rem', fontWeight: 500 }}>Live Camera Feed</div>
            <div style={{ width: '100%', backgroundColor: '#000', borderRadius: '12px', overflow: 'hidden', position: 'relative', aspectRatio: '4/3', boxShadow: '0 8px 24px rgba(0,0,0,0.15)' }}>
              <video ref={videoRef} autoPlay muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />
              <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(0,0,0,0.6)', color: 'white', padding: '0.5rem 0.75rem', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 500 }}>
                🔴 LIVE
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="directory-section" style={{ background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h3 style={{ margin: 0, fontSize: '1.4rem', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {selectedUserForHistory ? (
              <button onClick={() => setSelectedUserForHistory(null)} style={{ background: '#f1f5f9', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', color: '#475569', padding: '0.5rem', borderRadius: '8px' }}>
                 <ArrowLeft size={20} />
              </button>
            ) : <Users size={24} color="#0066cc" />}
            {selectedUserForHistory ? `${selectedUserForHistory.name}'s History` : 'Registered Profiles'}
          </h3>
          {!selectedUserForHistory && <p style={{ color: '#64748b', margin: 0, fontSize: '0.9rem' }}>Select a profile to view attendance history</p>}
        </div>

        {!selectedUserForHistory ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.5rem' }}>
            {employees.map(emp => (
              <div 
                key={emp.id} 
                onClick={() => setSelectedUserForHistory(emp)}
                style={{ 
                  background: '#f8fafc', 
                  borderRadius: '16px', 
                  padding: '1.5rem', 
                  cursor: 'pointer', 
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  border: '1px solid #e2e8f0',
                  position: 'relative'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.borderColor = '#0066cc';
                  e.currentTarget.style.background = 'white';
                  e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 102, 204, 0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = '#e2e8f0';
                  e.currentTarget.style.background = '#f8fafc';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <div style={{ width: '50px', height: '50px', background: '#e0f2fe', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0066cc' }}>
                    <User size={28} />
                  </div>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '1rem', color: '#1e293b' }}>{emp.name}</h4>
                    <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                       <Building size={12} /> {emp.department || 'RC Labs'}
                    </p>
                  </div>
                </div>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                   <Mail size={12} /> {emp.email}
                </div>
              </div>
            ))}
            {employees.length === 0 && (
              <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>
                No registered faces found.
              </div>
            )}
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                  <th style={{ padding: '1rem', color: '#475569', fontWeight: 600 }}>Date</th>
                  <th style={{ padding: '1rem', color: '#475569', fontWeight: 600 }}>Login</th>
                  <th style={{ padding: '1rem', color: '#475569', fontWeight: 600 }}>Logout</th>
                  <th style={{ padding: '1rem', color: '#475569', fontWeight: 600 }}>Duration</th>
                  <th style={{ padding: '1rem', color: '#475569', fontWeight: 600 }}>Location</th>
                  <th style={{ padding: '1rem', color: '#475569', fontWeight: 600, textAlign: 'center' }}>Photo</th>
                  <th style={{ padding: '1rem', color: '#475569', fontWeight: 600, textAlign: 'center' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {history.map((record, idx) => (
                  <tr key={record.id} style={{ borderBottom: '1px solid #e2e8f0', background: idx % 2 === 0 ? '#ffffff' : '#f8fafc' }}>
                    <td style={{ padding: '1rem', color: '#475569' }}>
                      {record.date}
                    </td>
                    <td style={{ padding: '1rem', color: '#1e293b', fontWeight: 500 }}>
                      {record.check_in_time}
                    </td>
                    <td style={{ padding: '1rem', color: '#1e293b', fontWeight: 500 }}>
                      {record.check_out_time || (
                         <button 
                          onClick={() => handleClockOutRow(record.id)}
                          style={{ padding: '0.4rem 0.8rem', background: '#dc2626', color: 'white', border: 'none', borderRadius: '6px', fontSize: '0.8rem', cursor: 'pointer', fontWeight: 600 }}
                         >
                           Logout
                         </button>
                      )}
                    </td>
                    <td style={{ padding: '1rem', color: '#0369a1', fontWeight: 600 }}>
                      {calculateDuration(record.check_in_time, record.check_out_time)}
                    </td>
                    <td style={{ padding: '1rem', maxWidth: '300px', fontSize: '0.9rem', color: '#64748b' }}>
                      {record.location_name || 'N/A'}
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'center' }}>
                      {record.image ? (
                        <img src={record.image} alt="verification" style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #e2e8f0' }} />
                      ) : 'N/A'}
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'center' }}>
                      <span style={{ 
                        padding: '0.4rem 0.8rem', 
                        borderRadius: '6px', 
                        fontSize: '0.85rem', 
                        fontWeight: 600,
                        backgroundColor: record.status === 'Login' ? '#dcfce7' : (record.status === 'Logout' ? '#e0f2fe' : '#fee2e2'),
                        color: record.status === 'Login' ? '#166534' : (record.status === 'Logout' ? '#0369a1' : '#991b1b'),
                        display: 'inline-block'
                      }}>
                        {record.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {history.length === 0 && (
                  <tr>
                    <td colSpan="5" style={{ textAlign: 'center', padding: '4rem', color: '#94a3b8' }}>
                      No records found for this user.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Success Popup Modal */}
      {showPopup && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, backdropFilter: 'blur(4px)' }}>
          <div style={{ background: 'white', padding: '3rem', borderRadius: '20px', textAlign: 'center', boxShadow: '0 20px 50px rgba(0,0,0,0.2)', maxWidth: '400px', width: '90%', animation: 'scaleUp 0.3s ease-out' }}>
            <div style={{ width: '80px', height: '80px', background: '#dcfce7', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: '#16a34a' }}>
              <CheckCircle size={48} />
            </div>
            <h2 style={{ margin: '0 0 1rem', color: '#1e293b' }}>Attendance Successful!</h2>
            <p style={{ color: '#64748b', margin: 0, fontSize: '1.1rem' }}>Logging you out securely...</p>
            <div style={{ marginTop: '2rem', height: '4px', background: '#f1f5f9', borderRadius: '2px', overflow: 'hidden' }}>
              <div style={{ height: '100%', background: '#16a34a', width: '100%', animation: 'progress 2.5s linear' }}></div>
            </div>
          </div>
          <style>{`
            @keyframes scaleUp { from { transform: scale(0.8); opacity: 0; } to { transform: scale(1); opacity: 1; } }
            @keyframes progress { from { width: 0%; } to { width: 100%; } }
          `}</style>
        </div>
      )}
    </div>
  );
}
