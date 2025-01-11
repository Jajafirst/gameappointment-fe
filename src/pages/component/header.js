import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './header.css';

const Header = () => {
  const [isProfileHovered, setIsProfileHovered] = useState(false);
  const navigate = useNavigate();

  const handleMouseEnter = () => {
    setIsProfileHovered(true);
  };

  const handleMouseLeave = () => {
    setIsProfileHovered(false);
  };

  const handleLogout = () => {
    navigate('/'); // Navigate to the home page (login page)
  };

  return (
    <header className="header">
      {/* Left section with Home Icon */}
      <div className="header-left">
        <NavLink to="/">
          <img
            src="https://img.icons8.com/ios-filled/50/FFFFFF/home.png"
            alt="Home Icon"
            className="home-icon"
          />
        </NavLink>
      </div>

      {/* Navigation links */}
      <nav className="header-right">
        <NavLink
          to="/profile"
          className={({ isActive }) => (isActive ? 'nav-link nav-link-active' : 'nav-link')}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          PROFILE
        </NavLink>
        <NavLink
          to="/gameList"
          className={({ isActive }) => (isActive ? 'nav-link nav-link-active' : 'nav-link')}
        >
          GAME
        </NavLink>
        <NavLink
          to="/schedule"
          className={({ isActive }) => (isActive ? 'nav-link nav-link-active' : 'nav-link')}
        >
          SCHEDULE
        </NavLink>
      </nav>

      {/* Profile Section */}
      {isProfileHovered && (
        <div
          className="profile-container"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <label>Username</label>
          <input type="text" placeholder="FirstZ" className="profile-input" readOnly />

          <label>Email</label>
          <input type="email" placeholder="example@gmail.com" className="profile-input" readOnly />

          <button className="logout-btn" onClick={handleLogout}>
            Log Out
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;