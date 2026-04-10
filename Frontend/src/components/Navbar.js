import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, MessageCircle, PlusCircle, Calendar, User } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const hideNavbarPaths = ['/login', '/otp', '/onboarding'];

  if (hideNavbarPaths.includes(location.pathname)) {
    return null;
  }

  return (
    <nav className="bottom-navbar">
      <NavLink to="/home" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <Home className="nav-icon" />
        <span>Home</span>
      </NavLink>
      <NavLink to="/chat" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <MessageCircle className="nav-icon" />
        <span>Buddy</span>
      </NavLink>
      <NavLink to="/create-event" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <PlusCircle className="nav-icon" />
        <span>Add</span>
      </NavLink>
      <NavLink to="/home" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <Calendar className="nav-icon" />
        <span>Events</span>
      </NavLink>
      <NavLink to="/profile" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <User className="nav-icon" />
        <span>Profile</span>
      </NavLink>
    </nav>
  );
};

export default Navbar;
