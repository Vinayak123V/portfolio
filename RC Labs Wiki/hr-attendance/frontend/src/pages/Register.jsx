import React, { useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import * as faceapi from '@vladmandic/face-api';
import { UserPlus, Camera } from 'lucide-react';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [webcamEnabled, setWebcamEnabled] = useState(false);
  const videoRef = useRef();
  
  const navigate = useNavigate();

  const startVideo = () => {
    setWebcamEnabled(true);
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        console.error("error:", err);
        setError("Error accessing webcam. Please allow permissions.");
      });
  };

  const stopVideo = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!webcamEnabled) return setError("Please start webcam to capture your face.");
    
    setLoading(true);
    setError('');
    
    try {
      const detections = await faceapi.detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
                                      .withFaceLandmarks()
                                      .withFaceDescriptor();
      if (!detections) {
        setLoading(false);
        return setError("No face detected. Please ensure your face is clearly visible.");
      }

      const face_encoding = Array.from(detections.descriptor);

      const res = await axios.post('http://localhost:5000/api/auth/register', { 
        name, email, password, face_encoding 
      });
      setMessage(res.data.message);
      stopVideo();
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    }
    setLoading(false);
  };

  return (
    <div className="glass-panel">
      <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
        <UserPlus size={28} /> Employee Registration
      </h2>
      {error && <div className="message error">{error}</div>}
      {message && <div className="message success">{message}</div>}
      
      <form onSubmit={handleRegister}>
        <div className="form-group">
          <label>Full Name</label>
          <input type="text" className="form-input" value={name} onChange={e => setName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Email Address</label>
          <input type="email" className="form-input" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" className="form-input" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>

        <div className="form-group">
          <label>Face Biometric Registration</label>
          {!webcamEnabled ? (
            <button type="button" className="btn-primary" onClick={startVideo} style={{ background: '#334155' }}>
              <Camera size={20} /> Enable Webcam
            </button>
          ) : (
            <div className="webcam-container">
              <video ref={videoRef} className="webcam-video" autoPlay muted />
            </div>
          )}
        </div>

        <button type="submit" className="btn-primary" disabled={loading || !webcamEnabled}>
          {loading ? 'Processing...' : 'Complete Registration'}
        </button>
      </form>
      <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
        <Link to="/login" className="link-text">Already have an account? Login here</Link>
      </div>
    </div>
  );
}
