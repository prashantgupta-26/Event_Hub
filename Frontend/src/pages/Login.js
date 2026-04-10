import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';

const Login = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // INIT EMAILJS (using user's key)
  emailjs.init("ossXsLjUHcLS9D7WJ");

  const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!email) {
      alert("Please enter email");
      return;
    }

    setLoading(true);
    const otp = generateOTP();

    const params = {
      to_email: email,
      otp: otp
    };

    try {
      await emailjs.send("service_toqopco", "template_g22nh97", params);
      localStorage.setItem('temp_email', email);
      localStorage.setItem('generated_otp', otp);
      alert("✅ OTP Sent to " + email);
      navigate('/otp');
    } catch (err) {
      console.error("EMAILJS ERROR:", err);
      alert("❌ Failed to send OTP. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="app-container"
      style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100vh' }}
    >
      <div className="card">
        <h1 className="gradient-text" style={{ fontSize: '32px', marginBottom: '8px' }}>EventHub</h1>
        <p style={{ color: '#666', marginBottom: '32px' }}>Join the community, discover events.</p>
        
        <form onSubmit={handleSendOtp}>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>Email Address</label>
          <input 
            type="email" 
            className="input" 
            placeholder="name@example.com" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="btn" disabled={loading}>
            {loading ? 'Sending...' : 'Get Started'}
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default Login;
