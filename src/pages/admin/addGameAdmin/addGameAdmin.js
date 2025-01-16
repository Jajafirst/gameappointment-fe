import React, { useState } from "react";
import HeaderAdmin from "../../component/header-admin/header-admin"; // Ensure the path is correct
import "./addGameAdmin.css";

const AddGameAdmin = () => {
  const [gameName, setGameName] = useState("");
  const [rank, setRank] = useState("");
  const [role, setRole] = useState("");
  const [ranks, setRanks] = useState(["Iron"]);
  const [roles, setRoles] = useState(["Duelist"]);
  const [description, setDescription] = useState("");
  const [gamePic, setGamePic] = useState(null); // Store the uploaded image preview

  // Handle Image Upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setGamePic(reader.result); // Set the image preview
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddGame = () => {
    const newGame = {
      name: gameName,
      description,
      ranks,
      roles,
      image: gamePic,
    };

    console.log("Added Game:", newGame); // Log for debugging or saving the game
    alert("Game added successfully!");
  };

  return (
    <>
      <HeaderAdmin />
      <div className="add-game-container-admin">
        <h1 className="add-game-title-admin">Add Game</h1>
        <div className="add-game-form-admin">
          {/* Left Section */}
          <div className="add-game-left-admin">
            <label>Game</label>
            <input
              type="text"
              value={gameName}
              onChange={(e) => setGameName(e.target.value)}
              placeholder="Enter game name"
              className="input-admin"
            />

            {/* Rank Section */}
            <label>Rank</label>
            <select className="input-admin">
              {ranks.map((r, index) => (
                <option key={index} value={r}>
                  {r}
                </option>
              ))}
            </select>
            <button
              className="add-button-admin"
              onClick={() =>
                setRanks((prevRanks) => [...prevRanks, rank.trim()])
              }
            >
              Add Rank
            </button>

            {/* Role Section */}
            <label>Role</label>
            <select className="input-admin">
              {roles.map((r, index) => (
                <option key={index} value={r}>
                  {r}
                </option>
              ))}
            </select>
            <button
              className="add-button-admin"
              onClick={() =>
                setRoles((prevRoles) => [...prevRoles, role.trim()])
              }
            >
              Add Role
            </button>

            {/* Description */}
            <label>Description of this game</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter game description"
              maxLength={300}
              className="textarea-admin"
            ></textarea>
          </div>

          {/* Right Section */}
          {/* Right Section */}
          <div className="game-detail-right-admin">
            {gamePic ? (
              <img
                src={gamePic}
                alt={`${gameName || "Game"} cover`}
                className="game-image-admin"
              />
            ) : (
              <div className="image-placeholder">Game Cover Preview</div>
            )}
            <label className="edit-image-label-admin">Edit Image</label>
            <input
              type="file"
              className="edit-image-input-admin"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = () => {
                    setGamePic(reader.result); // Update gamePic with the uploaded image
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
          </div>
        </div>
        <button className="submit-button-admin" onClick={handleAddGame}>
          Add Game
        </button>
      </div>
    </>
  );
};

export default AddGameAdmin;