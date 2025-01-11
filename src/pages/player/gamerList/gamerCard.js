import React from "react";
import { useNavigate } from "react-router-dom";
import "./gamerCard.css";

const GamerCard = ({ gamer }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate("/gamerTimeSlotSelection", { state: { gamer } });
  };

  const handleButtonClick = (e) => {
    e.stopPropagation(); // Prevent the card's click event
    navigate("/gamerTimeSlotSelection", { state: { gamer } });
  };

  return (
    <div className="gamer-card" onClick={handleCardClick}>
      {/* Image Section */}
      <div className="gamer-card-image">
        <img src={gamer.image} alt={gamer.name} />
      </div>

      {/* Info Section */}
      <div className="gamer-card-info">
        <h1 className="gamer-name">{gamer.name}</h1>
        <h2 className="gamer-game">{gamer.game}</h2>
        <p>
          <strong>Rank:</strong> {gamer.rank}
        </p>
        <p>
          <strong>Role:</strong> {gamer.role}
        </p>
        <p className="gamer-description">{gamer.description}</p>
      </div>

      {/* Choose Button */}
      <button
        className="choose-button"
        onClick={handleButtonClick} // Handles button click
      >
        Choose
      </button>
    </div>
  );
};

export default GamerCard;