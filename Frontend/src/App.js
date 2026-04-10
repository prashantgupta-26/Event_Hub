import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './styles/App.css';

// Pages
import Login from './pages/Login';
import OTPVerification from './pages/OTPVerification';
import Onboarding from './pages/Onboarding';
import Home from './pages/Home';
import ChatBuddy from './pages/ChatBuddy';
import CreateEvent from './pages/CreateEvent';
import Profile from './pages/Profile';

// Components
import Navbar from './components/Navbar';

function App() {
  const [user, setUser] = React.useState(null);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/otp" element={<OTPVerification />} />
          <Route path="/onboarding" element={<Onboarding setUser={setUser} />} />
          <Route path="/home" element={<Home />} />
          <Route path="/chat" element={<ChatBuddy />} />
          <Route path="/create-event" element={<CreateEvent />} />
          <Route path="/profile" element={<Profile user={user} />} />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
        <Navbar />
      </div>
    </Router>
  );
}

export default App;
