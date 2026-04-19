import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import * as faceapi from '@vladmandic/face-api';
import { Camera, MapPin, CheckCircle, AlertCircle } from 'lucide-react';

export default function Attendance() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);
  const [location, setLocation] = useState(null);
  const videoRef = useRef();
  const canvasRef = useRef();

  useEffect(() => {
    startVideo();
    fetchHistory();
    return () => stopVideo();
  }, []);

  const startVideo = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      })
      .catch((err) => console.error("error:", err));
  };

  const stopVideo = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
    }
  };

  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`http://localhost:5000/api/attendance?token=${token}`);
      setHistory(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const captureImage = () => {
    const video = videoRef.current;
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

  const markAttendance = async () => {
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      // 1. Get GPS
      const coords = await getCoordinates();
      setLocation({ lat: coords.latitude, lon: coords.longitude });

      // 2. Extract Face Descriptor
      const detections = await faceapi.detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
                                      .withFaceLandmarks()
                                      .withFaceDescriptor();
      if (!detections) {
        setLoading(false);
        return setError("No face detected in webcam. Please adjust lighting and face the camera.");
      }
      
      const descriptor = Array.from(detections.descriptor);
      
      // 3. Capture image for logs
      const base64Image = captureImage();

      // 4. Send to Backend
      const token = localStorage.getItem('token');
      const res = await axios.post('http://localhost:5000/mark-attendance', {
        token,
        latitude: coords.latitude,
        longitude: coords.longitude,
        descriptor,
        image: base64Image
      });

      setMessage(res.data.message);
      fetchHistory();

    } catch (err) {
      if (typeof err === "string") setError(err);
      else setError(err.response?.data?.error || 'Failed to mark attendance. Ensure server is running.');
    }
    setLoading(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', width: '100%', maxWidth: '1000px' }}>
      
      <div className="glass-panel wide" style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        <div style={{ flex: '1', minWidth: '300px' }}>
          <h2>Mark Daily Attendance</h2>
          <p style={{ color: '#94a3b8', marginBottom: '1.5rem' }}>
            System requires both Geolocation within 100m of the office, and live Facial recognition.
          </p>

          {error && <div className="message error" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><AlertCircle size={18}/> {error}</div>}
          {message && <div className="message success" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle size={18}/> {message}</div>}

          <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: '#cbd5e1' }}>
              <MapPin size={18} /> GPS Status: {location ? <span style={{color: '#4ade80'}}>Acquired</span> : <span style={{color: '#f87171'}}>Pending</span>}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#cbd5e1' }}>
              <Camera size={18} /> Camera Status: <span style={{color: '#4ade80'}}>Active</span>
            </div>
          </div>

          <button onClick={markAttendance} disabled={loading} className="btn-primary" style={{ height: '3.5rem', fontSize: '1.1rem' }}>
            {loading ? "Validating Identity & Location..." : "Mark Attendance Now"}
          </button>
        </div>

        <div style={{ flex: '1', minWidth: '300px' }}>
          <div className="webcam-container" style={{ margin: '0', height: '100%' }}>
            <video ref={videoRef} className="webcam-video" autoPlay muted />
            <canvas ref={canvasRef} className="overlay-canvas" />
          </div>
        </div>
      </div>

      <div className="glass-panel wide" style={{ padding: '2rem' }}>
        <h3>Your Attendance History</h3>
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Location (Lat, Lon)</th>
                <th>Verification Image</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {history.map(record => (
                <tr key={record.id}>
                  <td>{record.date}</td>
                  <td>{record.check_in_time}</td>
                  <td>{record.latitude.toFixed(4)}, {record.longitude.toFixed(4)}</td>
                  <td>
                    {record.image ? (
                      <img src={record.image} alt="verification" style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                    ) : 'None'}
                  </td>
                  <td>
                    <span className={`status-badge ${record.status === 'Success' ? 'success' : 'error'}`}>
                      {record.status}
                    </span>
                  </td>
                </tr>
              ))}
              {history.length === 0 && (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', color: '#94a3b8' }}>No attendance records found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
