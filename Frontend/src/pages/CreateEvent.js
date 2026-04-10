import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

const CreateEvent = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    category: 'Community'
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
        alert("Please login first");
        navigate('/login');
        return;
    }
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/events/create', { ...formData, created_by: user.id });
      alert('Event created successfully!');
      navigate('/home');
    } catch (err) {
      alert('Error creating event');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="app-container"
    >
      <div className="card">
        <h2 className="gradient-text" style={{ marginBottom: '24px' }}>Host an Event</h2>
        
        <form onSubmit={handleSubmit}>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>Event Title</label>
          <input 
            type="text" 
            className="input" 
            placeholder="e.g., Beach Clean-up" 
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            required
          />
          
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>Description</label>
          <textarea 
            className="input" 
            placeholder="Tell us about the event..." 
            rows="4"
            style={{ resize: 'none' }}
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            required
          />
          
          <div style={{ display: 'flex', gap: '16px' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>Date</label>
              <input 
                type="date" 
                className="input" 
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                required
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>Category</label>
              <select 
                className="input"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
              >
                <option value="Community">Community</option>
                <option value="Workshop">Workshop</option>
                <option value="Sports">Sports</option>
                <option value="Music">Music</option>
                <option value="Food">Food</option>
              </select>
            </div>
          </div>
          
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>Location</label>
          <input 
            type="text" 
            className="input" 
            placeholder="Address or Landmark" 
            value={formData.location}
            onChange={(e) => setFormData({...formData, location: e.target.value})}
            required
          />
          
          <button type="submit" className="btn" disabled={loading} style={{ marginTop: '16px' }}>
            {loading ? 'Posting...' : 'Post Event'}
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default CreateEvent;
