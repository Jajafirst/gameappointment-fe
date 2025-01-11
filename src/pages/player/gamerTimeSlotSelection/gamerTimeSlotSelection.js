import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../component/header";
import "./gamerTimeSlotSelection.css";

const GamerTimeSlotSelection = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { gamer } = location.state || {}; // Retrieve gamer data passed via state

  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showSummary, setShowSummary] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSlotClick = (id, available) => {
    if (available) setSelectedSlot(id);
  };

  const handleMakeAppointment = () => {
    if (selectedSlot) setShowSummary(true);
  };
  const handleClose = () => {
    setShowSummary(false); // Hide the summary modal
  };

  const handleConfirm = () => {
    setShowSummary(false);
    setShowSuccess(true);
  
    // Retrieve schedules from localStorage////
    const schedules = JSON.parse(localStorage.getItem("schedules")) || {};
  
    const appointment = {
      order: Date.now(), // Unique order ID
      gameName: gamer.game,
      gamerName: gamer.name,
      date: gamer.timeSlots.find((slot) => slot.id === selectedSlot).date,
      time: gamer.timeSlots.find((slot) => slot.id === selectedSlot).time,
    };
  
    const loggedInPlayer = JSON.parse(localStorage.getItem("loggedInPlayer"));
  
    // If the player is logged in, update their schedules
    if (loggedInPlayer) {
      const playerEmail = loggedInPlayer.email;
  
      if (!schedules[playerEmail]) {
        schedules[playerEmail] = { upcoming: [], history: [] };
      }
  
      schedules[playerEmail].upcoming.push(appointment);
  
      localStorage.setItem("schedules", JSON.stringify(schedules));
    }
  };

  const handleBack = () => {
    setShowSuccess(false);
    navigate("/gameList"); // Navigate back to the game list
  };

  return (
    <div>
      <Header />
      <div className="time-slot-page">
        {/* Gamer Info */}
        <div className="time-slot-container">
          <div className="gamer-info">
            <img src={gamer.image} alt={gamer.name} className="gamer-image" />
            <div className="gamer-details">
              <h1 className="gamer-name">{gamer.name}</h1>
              <p className="gamer-description">
                <strong>Description:</strong> {gamer.description}
              </p>
              <p><strong>Role:</strong> {gamer.role}</p>
              <p><strong>Rank:</strong> {gamer.rank}</p>
              <p><strong>Review:</strong> {gamer.review}</p>
            </div>
          </div>

          {/* Time Slot Title */}
          <h2 className="time-slot-title">Make an appointment</h2>

          {/* Time Slot Grid */}
          <div className="time-slot-grid">
            {gamer.timeSlots.map((slot) => (
              <div
                key={slot.id}
                className={`time-slot ${slot.available ? "available" : "unavailable"} ${selectedSlot === slot.id ? "selected" : ""
                  }`}
                onClick={() => handleSlotClick(slot.id, slot.available)}
              >
                <p>
                  <strong>Date:</strong> {slot.date}
                </p>
                <p>
                  <strong>Time:</strong> {slot.time}
                </p>
              </div>
            ))}
          </div>

          {/* Confirm Button */}
          <button
            className="make-appointment-btn"
            disabled={!selectedSlot}
            onClick={handleMakeAppointment}
          >
            Make Appointment
          </button>
        </div>
      </div>

      {showSummary && (
  <div className="modal" onClick={handleClose}>
    <div
      className="modal-content"
      onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
    >
      <h2>Summary</h2>
      <p><strong>Game:</strong> {gamer.game}</p>
      <p><strong>Gamer:</strong> {gamer.name}</p>
      <p><strong>Role:</strong> {gamer.role}</p>
      <p><strong>Rank:</strong> {gamer.rank}</p>
      <p>
        <strong>Appointment Date:</strong> {gamer.timeSlots.find((slot) => slot.id === selectedSlot).date}
      </p>
      <p>
        <strong>Appointment Time:</strong> {gamer.timeSlots.find((slot) => slot.id === selectedSlot).time}
      </p>

      {/* Confirm Button */}
      <button className="btn" onClick={handleConfirm}>
        Confirm
      </button>

      {/* Close Button */}
      <button className="btn close-btn" onClick={handleClose}>
        Close
      </button>
    </div>
  </div>
)}

      {/* Success Message */}
      {showSuccess && (
        <div className="modal">
          <div className="modal-content">
            <h2>Appointment Successfully Confirmed</h2>
            <p>"Your appointment has been successfully scheduled."</p>
            <button className="btn" onClick={handleBack}>Back</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GamerTimeSlotSelection;