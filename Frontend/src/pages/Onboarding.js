import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

const Onboarding = ({ setUser }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const email = localStorage.getItem('temp_email');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/user/profile', { ...formData, email });
      localStorage.setItem('user', JSON.stringify(res.data.user));
      setUser(res.data.user);
      navigate('/home');
    } catch (err) {
      alert('Error saving profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="app-container"
    >
      <div className="card">
        <h2 className="gradient-text" style={{ marginBottom: '8px' }}>Complete Profile</h2>
        <p style={{ color: '#666', marginBottom: '24px' }}>Tell us more about yourself</p>
        
        <form onSubmit={handleSubmit}>
          <label className="label">Full Name</label>
          <input 
            type="text" 
            className="input" 
            placeholder="John Doe" 
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
          />
          
          <label className="label">Phone Number</label>
          <input 
            type="tel" 
            className="input" 
            placeholder="+1234567890" 
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            required
          />
          
          <label className="label">Location</label>
          <input 
            type="text" 
            className="input" 
            placeholder="New York, USA" 
            value={formData.location}
            onChange={(e) => setFormData({...formData, location: e.target.value})}
            required
          />
          
          <button type="submit" className="btn" disabled={loading}>
            {loading ? 'Saving...' : 'Complete Registration'}
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default Onboarding;
