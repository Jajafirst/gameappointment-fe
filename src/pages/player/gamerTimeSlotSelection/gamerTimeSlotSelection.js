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

  if (!gamer) {
    return (
      <div>
        <Header />
        <h1>No gamer data found. Please navigate from the correct page.</h1>
      </div>
    );
  }

  // Access the selected game
  const selectedGame = gamer.games[0]; // Assuming the first game is selected, or update logic accordingly

  if (!selectedGame || !selectedGame.timeSlots) {
    return (
      <div>
        <Header />
        <h1>No time slots available for this game.</h1>
      </div>
    );
  }

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

    // Retrieve schedules from localStorage
    const schedules = JSON.parse(localStorage.getItem("schedules")) || {};

    const appointment = {
      order: Date.now(), // Unique order ID
      gameName: selectedGame.game,
      gamerName: gamer.name,
      date: selectedGame.timeSlots.find((slot) => slot.id === selectedSlot).date,
      time: selectedGame.timeSlots.find((slot) => slot.id === selectedSlot).time,
    };

    const loggedInPlayer = JSON.parse(localStorage.getItem("loggedInPlayer"));

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
    navigate("/gameList");
  };

  return (
    <div>
      <Header />
      <div className="time-slot-page">
        <div className="time-slot-container">
          <div className="gamer-info">
            <img src={gamer.image} alt={gamer.name} className="gamer-image" />
            <div className="gamer-details">
              <h1 className="gamer-name">{gamer.name}</h1>
              {/* Accessing the selected game's name */}
              <h1 className="gamer-game">{selectedGame?.game || "No game selected"}</h1>
              <p className="gamer-description">
                <strong>Description:</strong> {selectedGame?.description || gamer.description}
              </p>
              {/* Displaying the role and rank dynamically */}
              <p><strong>Role:</strong> {selectedGame?.role || "N/A"}</p>
              <p><strong>Rank:</strong> {selectedGame?.rank || "N/A"}</p>
              <p className="gamer-review">
                <strong>Review Rate:</strong> {selectedGame?.review || "N/A"}
              </p>
            </div>
          </div>

          <h2 className="time-slot-title">Make an appointment</h2>
          <div className="time-slot-grid">
            {selectedGame.timeSlots.map((slot) => (
              <div
                key={slot.id}
                className={`time-slot ${slot.available ? "available" : "unavailable"} ${selectedSlot === slot.id ? "selected" : ""
                  }`}
                onClick={() => handleSlotClick(slot.id, slot.available)}
              >
                <p><strong>Date:</strong> {slot.date}</p>
                <p><strong>Time:</strong> {slot.time}</p>
              </div>
            ))}
          </div>

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
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Summary</h2>
            <p><strong>Game:</strong> {selectedGame.game}</p>
            <p><strong>Gamer:</strong> {gamer.name}</p>
            <p>
              <strong>Appointment Date:</strong> {selectedGame.timeSlots.find((slot) => slot.id === selectedSlot).date}
            </p>
            <p>
              <strong>Appointment Time:</strong> {selectedGame.timeSlots.find((slot) => slot.id === selectedSlot).time}
            </p>
            <button className="btn" onClick={handleConfirm}>Confirm</button>
            <button className="btn close-btn" onClick={handleClose}>Close</button>
          </div>
        </div>
      )}

      {showSuccess && (
        <div className="modal">
          <div className="modal-content">
            <h2>Appointment Successfully Confirmed</h2>
            <p>Your appointment has been successfully scheduled.</p>
            <button className="btn" onClick={handleBack}>Back</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GamerTimeSlotSelection;