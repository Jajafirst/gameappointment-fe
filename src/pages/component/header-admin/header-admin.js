import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./header-admin.css";

const HeaderAdmin = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleNavigation = (path, sectionId = null) => {
    navigate(path);
    if (sectionId) {
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      }, 0);
    }
    setIsMenuOpen(false); // Close the menu
    setIsDropdownOpen(false); // Close the dropdown
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
          {/* Back Link */}
          <li className="back-link">
            <button onClick={() => setIsMenuOpen(false)}>- Back</button>
          </li>

          <li>
            <button onClick={() => handleNavigation("/adminDashboard")}>
              Home
            </button>
          </li>



          {/* Dropdown Menu */}
          <li className="dropdown-admin">
            <button onClick={handleDropdownToggle}>
              Admin Dashboard Menu
            </button>
            {isDropdownOpen && (
              <ul className="dropdown-menu-admin">
                <li>
                  <button
                    onClick={() =>
                      handleNavigation("/adminDashboard", "OverallNumbers")
                    }
                  >
                    Overall Numbers
                  </button>
                </li>
                <li>
                  <button
                    onClick={() =>
                      handleNavigation("/adminDashboard", "TableOverall")
                    }
                  >
                    Table Overall
                  </button>
                </li>
                <li>
                  <button
                    onClick={() =>
                      handleNavigation("/adminDashboard", "PlayerList")
                    }
                  >
                    Player
                  </button>
                </li>
                <li>
                  <button
                    onClick={() =>
                      handleNavigation("/adminDashboard", "GamerList")
                    }
                  >
                    Gamer
                  </button>
                </li>
                <li>
                  <button
                    onClick={() =>
                      handleNavigation("/adminDashboard", "GameList")
                    }
                  >
                    Game
                  </button>
                </li>
                <li>
                  <button
                    onClick={() =>
                      handleNavigation(
                        "/adminDashboard",
                        "AllAvailableTimeSlot"
                      )
                    }
                  >
                    Overall Schedule
                  </button>
                </li>
              </ul>
            )}
          </li>

          {/* Add Game */}
          <li>
            <button onClick={() => handleNavigation("/adminAddGame")}>
              Add Game
            </button>
          </li>

        </ul>
      </nav>
    </header>
  );
};

export default HeaderAdmin;