import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

const OTPVerification = () => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const email = localStorage.getItem('temp_email');
  const generatedOTP = localStorage.getItem('generated_otp');

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (otp === generatedOTP) {
        // SUCCESS: Now check if user is in DB
        try {
            const res = await axios.get(`http://localhost:5000/api/user/profile?email=${email}`);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            alert("✅ Verified Successfully!");
            navigate('/home');
        } catch (err) {
            // If user not found, navigate to onboarding
            if (err.response && err.response.status === 404) {
                alert("✅ Verified! Please complete your profile.");
                navigate('/onboarding');
            } else {
                alert("Error connecting to server.");
            }
        } finally {
            setLoading(false);
        }
    } else {
        alert("❌ Wrong OTP");
        setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="app-container"
      style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100vh' }}
    >
      <div className="card">
        <h2 className="gradient-text" style={{ marginBottom: '8px' }}>Verify OTP</h2>
        <p style={{ color: '#666', marginBottom: '32px' }}>Sent to {email}</p>
        
        <form onSubmit={handleVerifyOtp}>
          <input 
            type="text" 
            className="input" 
            placeholder="6-digit OTP" 
            maxLength="6"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            style={{ textAlign: 'center', fontSize: '24px', letterSpacing: '8px' }}
          />
          <button type="submit" className="btn" disabled={loading}>
            {loading ? 'Verifying...' : 'Verify'}
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default OTPVerification;
