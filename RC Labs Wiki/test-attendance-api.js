// Quick test script to verify attendance API
const axios = require('axios');

const API = 'http://localhost:5000/api';

async function test() {
  try {
    console.log('1. Testing register endpoint...');
    const registerRes = await axios.post(`${API}/register`, {
      name: 'Test User',
      email: `test${Date.now()}@example.com`,
      password: 'password123',
      department: 'Testing'
    });
    
    const token = registerRes.data.token;
    const userId = registerRes.data.user.id;
    console.log('✓ User registered:', registerRes.data.user.name);
    console.log('✓ Token:', token.substring(0, 20) + '...');
    
    console.log('\n2. Testing register-face endpoint...');
    const faceDescriptor = Array(128).fill(0.5); // Mock descriptor
    
    const faceRes = await axios.post(`${API}/attendance/register-face`, {
      face_encoding: faceDescriptor
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    console.log('✓ Face registered:', faceRes.data.message);
    
    console.log('\n3. Testing mark attendance endpoint...');
    const attendanceRes = await axios.post(`${API}/attendance/mark`, {
      token,
      latitude: 13.1463,
      longitude: 77.6190,
      descriptor: faceDescriptor,
      image: 'data:image/jpeg;base64,test'
    });
    
    console.log('✓ Attendance marked:', attendanceRes.data.message);
    
    console.log('\n4. Testing history endpoint...');
    const historyRes = await axios.get(`${API}/attendance/history?token=${token}`);
    console.log('✓ History retrieved:', historyRes.data.length, 'records');
    
    console.log('\n✅ All tests passed!');
    
  } catch (err) {
    console.error('❌ Test failed:', err.response?.data || err.message);
    process.exit(1);
  }
}

test();
