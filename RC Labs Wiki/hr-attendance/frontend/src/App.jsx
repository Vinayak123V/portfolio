import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import * as faceapi from '@vladmandic/face-api';
import Login from './pages/Login';
import Register from './pages/Register';
import Attendance from './pages/Attendance';
import Admin from './pages/Admin';

function App() {
  const [modelsLoaded, setModelsLoaded] = useState(false);

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
      }
    };
    loadModels();
  }, []);

  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <BrowserRouter>
      <div className="app-container">
        <nav className="navbar">
          <div style={{ color: "white", fontWeight: "bold", fontSize: "1.2rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{background: "linear-gradient(135deg, #0ea5e9, #3b82f6)", padding: "0.25rem 0.5rem", borderRadius: "4px"}}>GeoFace</span> HR
          </div>
          <div>
            {!isAuthenticated ? (
              <>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
              </>
            ) : (
              <>
                <Link to="/attendance">Attendance</Link>
                <Link to="/admin">Admin</Link>
                <a href="#" onClick={() => {
                  localStorage.removeItem('token');
                  localStorage.removeItem('user');
                  window.location.href = '/login';
                }}>Logout</a>
              </>
            )}
          </div>
        </nav>
        
        <div className="main-content">
          {!modelsLoaded ? (
            <div className="glass-panel" style={{textAlign: 'center'}}>
              <h3>Loading Face AI Models...</h3>
              <p style={{color: '#94a3b8'}}>Please wait while we initialize the neural networks for security.</p>
            </div>
          ) : (
            <Routes>
              <Route path="/" element={<Navigate to={isAuthenticated ? "/attendance" : "/login"} />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/attendance" element={isAuthenticated ? <Attendance /> : <Navigate to="/login" />} />
              <Route path="/admin" element={isAuthenticated ? <Admin /> : <Navigate to="/login" />} />
            </Routes>
          )}
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
