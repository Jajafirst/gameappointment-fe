import React, { useState } from "react";
import "./profile-gamer.css";

const ProfileGamer = () => {
  const [profilePic, setProfilePic] = useState(localStorage.getItem("profilePic") || "/default-profile.png");

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfilePic(event.target.result);
        localStorage.setItem("profilePic", event.target.result); // Save the profile picture in local storage
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInPlayer");
    localStorage.removeItem("profilePic");
    window.location.href = "/";
  };

  return (
    <div className="profile-container-gamer">
      <div className="profile-picture-container">
        <img src={profilePic} alt="Profile" className="profile-picture" />
        <input
          type="file"
          accept="image/*"
          id="profile-pic-upload"
          style={{ display: "none" }}
          onChange={handleProfilePicChange}
        />
        <label htmlFor="profile-pic-upload" className="change-picture-label">
          Change Picture
        </label>
      </div>

      <label>Username</label>
      <input
        type="text"
        className="profile-input"
        value="Tenz" // Replace with dynamic username if needed
        readOnly // Make editable if necessary
      />

      <label>Email</label>
      <input
        type="email"
        className="profile-input"
        value="Tenz@gmail.com" // Replace with dynamic email if needed
        readOnly // Make editable if necessary
      />

      <button className="logout-btn" onClick={handleLogout}>
        Log Out
      </button>
    </div>
  );
};

export default ProfileGamer;