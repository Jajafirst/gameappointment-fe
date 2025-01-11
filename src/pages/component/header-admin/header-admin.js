import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./header-admin.css";

const HeaderAdmin = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuItemClick = () => {
    setIsMenuOpen(false); // Close the menu when a menu item is clicked
  };

  return (
    <header className="header-admin">
      {/* Menu Icon */}
      <div className="menu-icon-admin" onClick={handleMenuToggle}>
        &#9776; {/* Hamburger Menu Icon */}
      </div>

      {/* Slide-Out Menu */}
      <nav className={`menu-admin ${isMenuOpen ? "open" : ""}`}>
        <ul>
          <li>
            <Link to="/adminDashboard" onClick={handleMenuItemClick}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/player" onClick={handleMenuItemClick}>
              Player
            </Link>
          </li>
          <li>
            <Link to="/gamer" onClick={handleMenuItemClick}>
              Gamer
            </Link>
          </li>
          <li>
            <Link to="/game" onClick={handleMenuItemClick}>
              Game
            </Link>
          </li>
          <li>
            <Link to="/overallSchedule" onClick={handleMenuItemClick}>
              Overall Schedule
            </Link>
          </li>
          <li>
            <Link to="/adminAddGame" onClick={handleMenuItemClick}>
              Add Game
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default HeaderAdmin;