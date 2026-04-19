import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Users, CheckCircle, XCircle, UserCheck, ArrowLeft, Calendar, Filter, User, Mail, Building } from 'lucide-react';

export default function AdminAttendance() {
  const [employees, setEmployees] = useState([]);
  const [history, setHistory] = useState([]);
  const [stats, setStats] = useState({ totalToday: 0, successToday: 0, failedToday: 0, uniqueUsersToday: 0 });
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [filters, setFilters] = useState({
    year: new Date().getFullYear().toString(),
    month: (new Date().getMonth() + 1).toString().padStart(2, '0')
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('rc_token');
      const headers = { Authorization: `Bearer ${token}` };

      if (selectedUser) {
        const res = await axios.get(`http://localhost:5000/api/attendance/admin?userId=${selectedUser.id}&year=${filters.year}&month=${filters.month}`);
        setHistory(res.data);
      } else {
        const [empRes, statsRes] = await Promise.all([
          axios.get('http://localhost:5000/api/employees', { headers }),
          axios.get('http://localhost:5000/api/attendance/summary', { headers })
        ]);
        setEmployees(empRes.data);
        setStats(statsRes.data);
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [selectedUser, filters]);

  const years = Array.from({ length: 5 }, (_, i) => (new Date().getFullYear() - i).toString());
  const months = [
    { v: '01', l: 'January' }, { v: '02', l: 'February' }, { v: '03', l: 'March' },
    { v: '04', l: 'April' }, { v: '05', l: 'May' }, { v: '06', l: 'June' },
    { v: '07', l: 'July' }, { v: '08', l: 'August' }, { v: '09', l: 'September' },
    { v: '10', l: 'October' }, { v: '11', l: 'November' }, { v: '12', l: 'December' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
      
      {!selectedUser && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ background: '#e0f2fe', padding: '0.75rem', borderRadius: '8px', color: '#0369a1' }}><Users /></div>
            <div>
              <div style={{ fontSize: '0.875rem', color: '#64748b' }}>Total Check-ins (Today)</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{stats.totalToday}</div>
            </div>
          </div>
          <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ background: '#dcfce7', padding: '0.75rem', borderRadius: '8px', color: '#15803d' }}><CheckCircle /></div>
            <div>
              <div style={{ fontSize: '0.875rem', color: '#64748b' }}>Success</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#16a34a' }}>{stats.successToday}</div>
            </div>
          </div>
          <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ background: '#fef2f2', padding: '0.75rem', borderRadius: '8px', color: '#b91c1c' }}><XCircle /></div>
            <div>
              <div style={{ fontSize: '0.875rem', color: '#64748b' }}>Failed</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#dc2626' }}>{stats.failedToday}</div>
            </div>
          </div>
          <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ background: '#fef3c7', padding: '0.75rem', borderRadius: '8px', color: '#b45309' }}><UserCheck /></div>
            <div>
              <div style={{ fontSize: '0.875rem', color: '#64748b' }}>Unique Employees</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{stats.uniqueUsersToday}</div>
            </div>
          </div>
        </div>
      )}

      <div style={{ position: 'relative' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', margin: 0, color: '#1e293b' }}>
              {selectedUser ? (
                <button onClick={() => setSelectedUser(null)} style={{ background: '#f1f5f9', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', color: '#475569', padding: '0.5rem', borderRadius: '8px' }}>
                   <ArrowLeft size={20} />
                </button>
              ) : <Users size={28} color="#0066cc" />}
              {selectedUser ? `${selectedUser.name}'s Attendance` : 'Employee Directory'}
            </h2>
            {!selectedUser && <p style={{ color: '#64748b', margin: '0.5rem 0 0' }}>Select a profile card below to view their historical logs.</p>}
          </div>

          {selectedUser && (
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', background: 'white', padding: '0.75rem 1rem', borderRadius: '12px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
              <Filter size={18} color="#64748b" />
              <select 
                value={filters.month} 
                onChange={(e) => setFilters(f => ({ ...f, month: e.target.value }))}
                style={{ border: '1px solid #cbd5e1', borderRadius: '6px', padding: '0.4rem 0.6rem', outline: 'none', fontSize: '0.9rem' }}
              >
                {months.map(m => <option key={m.v} value={m.v}>{m.l}</option>)}
              </select>
              <select 
                value={filters.year} 
                onChange={(e) => setFilters(f => ({ ...f, year: e.target.value }))}
                style={{ border: '1px solid #cbd5e1', borderRadius: '6px', padding: '0.4rem 0.6rem', outline: 'none', fontSize: '0.9rem' }}
              >
                {years.map(y => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>
          )}
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '5rem', background: 'white', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
            <div style={{ width: '40px', height: '40px', border: '3px solid #f3f3f3', borderTop: '3px solid #0066cc', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 1.5rem' }} />
            <p style={{ color: '#64748b', fontWeight: 500 }}>Fetching data...</p>
            <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
          </div>
        ) : !selectedUser ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {employees.map(emp => (
              <div 
                key={emp.id} 
                onClick={() => setSelectedUser(emp)}
                style={{ 
                  background: 'white', 
                  borderRadius: '16px', 
                  padding: '1.5rem', 
                  boxShadow: '0 4px 15px rgba(0,0,0,0.05)', 
                  cursor: 'pointer', 
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  border: '1px solid transparent',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.borderColor = '#0066cc';
                  e.currentTarget.style.boxShadow = '0 12px 25px rgba(0, 102, 204, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'transparent';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.05)';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
                  <div style={{ width: '60px', height: '60px', background: 'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0066cc' }}>
                    <User size={32} />
                  </div>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#1e293b' }}>{emp.name}</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#64748b', fontSize: '0.85rem', marginTop: '0.2rem' }}>
                      <Building size={14} /> {emp.department || 'General'}
                    </div>
                  </div>
                </div>
                <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#94a3b8', fontSize: '0.85rem' }}>
                   <Mail size={14} /> {emp.email}
                </div>
                <div style={{ position: 'absolute', right: '-10px', bottom: '-10px', color: '#f1f5f9' }}>
                   <Users size={80} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #f1f5f9', background: '#f8fafc' }}>
                  <th style={{ padding: '1rem', color: '#64748b' }}>Date</th>
                  <th style={{ padding: '1rem', color: '#64748b' }}>Time</th>
                  <th style={{ padding: '1rem', color: '#64748b' }}>Location</th>
                  <th style={{ padding: '1rem', color: '#64748b', textAlign: 'center' }}>Photo</th>
                  <th style={{ padding: '1rem', color: '#64748b', textAlign: 'center' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {history.map(record => (
                  <tr key={record.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '1rem' }}>{record.date}</td>
                    <td style={{ padding: '1rem', fontWeight: 500 }}>{record.check_in_time}</td>
                    <td style={{ padding: '1rem', maxWidth: '250px', fontSize: '0.9rem', color: '#475569' }}>{record.location_name || 'N/A'}</td>
                    <td style={{ padding: '1rem', textAlign: 'center' }}>
                      {record.image ? (
                        <img src={record.image} alt="capture" style={{ width: '45px', height: '45px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #f1f5f9' }} />
                      ) : 'N/A'}
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'center' }}>
                      <span style={{ 
                        padding: '0.4rem 0.8rem', 
                        borderRadius: '8px', 
                        fontSize: '0.85rem', 
                        fontWeight: 600,
                        backgroundColor: record.status === 'Success' ? '#dcfce7' : '#fee2e2',
                        color: record.status === 'Success' ? '#166534' : '#991b1b'
                      }}>
                        {record.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {history.length === 0 && (
                  <tr>
                    <td colSpan="5" style={{ textAlign: 'center', padding: '5rem', color: '#94a3b8' }}>
                       <Calendar size={48} style={{ opacity: 0.2, marginBottom: '1rem' }} /><br />
                       No records found for {filters.month}/{filters.year}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
    </div>
    </div>
  );
}
