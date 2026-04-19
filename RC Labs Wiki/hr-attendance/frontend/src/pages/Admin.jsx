import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Users } from 'lucide-react';

export default function Admin() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminHistory = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/admin/attendance');
        setHistory(res.data);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchAdminHistory();
  }, []);

  return (
    <div className="glass-panel wide" style={{ width: '100%' }}>
      <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Users size={28} /> Company Attendance Dashboard (Admin)
      </h2>
      <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>
        Overview of all employee check-ins including GPS and face verification logs.
      </p>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '2rem' }}>Loading data...</div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Employee Name</th>
                <th>Date</th>
                <th>Time (Check-In)</th>
                <th>Location (Lat, Lon)</th>
                <th>Stored Image</th>
                <th>Verification Status</th>
              </tr>
            </thead>
            <tbody>
              {history.map(record => (
                <tr key={record.id}>
                  <td>#{record.id}</td>
                  <td style={{ fontWeight: '500' }}>{record.name}</td>
                  <td>{record.date}</td>
                  <td>{record.check_in_time}</td>
                  <td>{record.latitude?.toFixed(4)}, {record.longitude?.toFixed(4)}</td>
                  <td>
                    {record.image ? (
                      <img src={record.image} alt="capture" style={{ width: '50px', height: '50px', borderRadius: '8px', objectFit: 'cover' }} />
                    ) : 'N/A'}
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
                  <td colSpan="7" style={{ textAlign: 'center', color: '#94a3b8' }}>No records found in database.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
