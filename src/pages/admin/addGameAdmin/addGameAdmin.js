import React, { useState } from "react";
import HeaderAdmin from "../../component/header-admin/header-admin";
import "./addGameAdmin.css";

const AddGameAdmin = () => {
  const [gameName, setGameName] = useState("");
  const [rank, setRank] = useState("");
  const [role, setRole] = useState("");
  const [ranks, setRanks] = useState(["Iron"]); // Default rank
  const [roles, setRoles] = useState(["Duelist"]); // Default role
  const [description, setDescription] = useState("");
  const [gamePic, setGamePic] = useState(null);

  const handleAddRank = () => {
    if (rank.trim() && !ranks.includes(rank.trim())) {
      setRanks([...ranks, rank.trim()]);
      setRank("");
    } else {
      alert("Please enter a valid rank or avoid duplicates!");
    }
  };

  const handleAddRole = () => {
    if (role.trim() && !roles.includes(role.trim())) {
      setRoles([...roles, role.trim()]);
      setRole("");
    } else {
      alert("Please enter a valid role or avoid duplicates!");
    }
  };

  const handleFileChange = (e) => {
    setGamePic(e.target.files[0]);
  };

  const handleSubmit = () => {
    const gameData = {
      gameName,
      ranks,
      roles,
      description,
      gamePic: gamePic?.name || "No file chosen",
    };
    console.log("Game Data Submitted:", gameData);
    alert("Game Added Successfully!");
  };

  return (
    <div className="add-game-container-admin">
      <HeaderAdmin />
      <h1 className="add-game-title-admin">Add Game</h1>
      <div className="add-game-layout-admin">
        {/* Left Section */}
        <div className="left-section-admin">
          {/* Game Name */}
          <div className="form-group-admin">
            <label>Game</label>
            <input
              type="text"
              value={gameName}
              onChange={(e) => setGameName(e.target.value)}
              placeholder="Enter game name"
              className="input-admin"
            />
          </div>

          {/* Rank Section */}
          <div className="form-group-admin">
            <label>Rank</label>
            <select className="input-admin">
              {ranks.map((rank, index) => (
                <option key={index} value={rank}>
                  {rank}
                </option>
              ))}
            </select>
            <button className="add-button-admin" onClick={handleAddRank}>
              Add Rank
            </button>
          </div>

          {/* Role Section */}
          <div className="form-group-admin">
            <label>Role</label>
            <select className="input-admin">
              {roles.map((role, index) => (
                <option key={index} value={role}>
                  {role}
                </option>
              ))}
            </select>
            <button className="add-button-admin" onClick={handleAddRole}>
              Add Role
            </button>
          </div>

          {/* Description */}
          <div className="form-group-admin">
            <label>Description of this game</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter game description"
              maxLength={300}
              className="textarea-admin"
            ></textarea>
          </div>
        </div>

        {/* Right Section */}
        <div className="right-section-admin">
          <div className="form-group-admin">
            <label>Upload Game Pic</label>
            <div className="upload-box-admin">
              <input type="file" className="input-admin" onChange={handleFileChange} />
              {gamePic && <p>Selected File: {gamePic.name}</p>}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <button className="submit-button-admin" onClick={handleSubmit}>
        Add Game
      </button>
    </div>
  );
};

export default AddGameAdmin;