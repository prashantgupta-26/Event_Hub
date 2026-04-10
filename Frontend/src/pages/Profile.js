import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, LogOut } from 'lucide-react';

const Profile = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) {
    return (
      <div className="app-container" style={{ textAlign: 'center', marginTop: '100px' }}>
        <p>Please log in to view your profile.</p>
        <button className="btn" onClick={() => navigate('/login')}>Login</button>
      </div>
    );
  }

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('temp_email');
    navigate('/login');
  };

  return (
    <div className="app-container">
      <header style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div style={{ 
          width: '100px', 
          height: '100px', 
          borderRadius: '50%', 
          background: 'var(--primary-gradient)', 
          margin: '0 auto 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white'
        }}>
          <User size={50} />
        </div>
        <h2 style={{ marginBottom: '4px' }}>{user.name}</h2>
        <p style={{ color: '#666' }}>{user.location}</p>
      </header>

      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
          <Mail size={20} style={{ color: 'var(--warm-orange)', marginRight: '16px' }} />
          <div>
            <p style={{ fontSize: '12px', color: '#888' }}>Email</p>
            <p>{user.email}</p>
          </div>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
          <Phone size={20} style={{ color: 'var(--warm-orange)', marginRight: '16px' }} />
          <div>
            <p style={{ fontSize: '12px', color: '#888' }}>Phone</p>
            <p>{user.phone}</p>
          </div>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <MapPin size={20} style={{ color: 'var(--warm-orange)', marginRight: '16px' }} />
          <div>
            <p style={{ fontSize: '12px', color: '#888' }}>Location</p>
            <p>{user.location}</p>
          </div>
        </div>
      </div>

      <button 
        className="btn" 
        style={{ background: 'white', color: '#FF4D4D', border: '1px solid #FF4D4D', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        onClick={handleLogout}
      >
        <LogOut size={20} style={{ marginRight: '8px' }} />
        Logout
      </button>
    </div>
  );
};

export default Profile;
