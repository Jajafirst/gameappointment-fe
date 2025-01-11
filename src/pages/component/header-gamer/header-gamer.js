import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import ProfileGamer from "../header-gamer/profile-gamer"; // Import ProfileGamer component
import "./header-gamer.css";

const HeaderGamer = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleMouseEnter = () => {
    setShowDropdown(true); // Show dropdown on hover
  };

  const handleMouseLeave = () => {
    setShowDropdown(false); // Hide dropdown when mouse leaves
  };

  return (
    <header className="header-gamer">
      {/* Logo */}
      <NavLink to="/" className="home-gamer">
        <i className="icon-home-gamer"></i>
      </NavLink>

      {/* Navigation Links */}
      <nav className="links-container-gamer">
        <NavLink
          to="/game"
          className={({ isActive }) =>
            isActive ? "link-gamer active-gamer" : "link-gamer"
          }
        >
          Game
        </NavLink>
        <NavLink
          to="/time"
          className={({ isActive }) =>
            isActive ? "link-gamer active-gamer" : "link-gamer"
          }
        >
          Time
        </NavLink>
        <NavLink
          to="/scheduleGamer"
          className={({ isActive }) =>
            isActive ? "link-gamer active-gamer" : "link-gamer"
          }
        >
          Schedule
        </NavLink>

        {/* Profile with Dropdown */}
        <div
          className="profile-hover-container"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive ? "link-gamer active-gamer" : "link-gamer"
            }
          >
            Profile
          </NavLink>
          {showDropdown && <ProfileGamer />} {/* Show dropdown if hovered */}
        </div>
      </nav>
    </header>
  );
};

export default HeaderGamer;