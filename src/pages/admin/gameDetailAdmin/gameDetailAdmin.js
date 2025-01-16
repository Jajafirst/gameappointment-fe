import React, { useState } from "react";
import HeaderAdmin from "../../component/header-admin/header-admin"; // Ensure the path is correct
import { gameDetailData } from "../../../data/gameDetailData"; // Import the gameDetailData
import "./gameDetailAdmin.css";

const GameDetailAdmin = () => {
  const [game, setGame] = useState({ ...gameDetailData });
  const [isRankDropdownOpen, setIsRankDropdownOpen] = useState(false);
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [editingField, setEditingField] = useState(null); // Tracks the current field being edited
  const [editValue, setEditValue] = useState(""); // Current value in the edit modal
  const [editIndex, setEditIndex] = useState(null); // Index of the item being edited
  const [newRank, setNewRank] = useState(""); // State for adding new ranks
  const [newRole, setNewRole] = useState(""); // State for adding new roles

  // Toggle Dropdown
  const toggleDropdown = (type) => {
    if (type === "rank") {
      setIsRankDropdownOpen(!isRankDropdownOpen);
      setIsRoleDropdownOpen(false);
    } else if (type === "role") {
      setIsRoleDropdownOpen(!isRoleDropdownOpen);
      setIsRankDropdownOpen(false);
    }
  };

  // Handle Edit Button Click
  const handleEdit = (field, index, value) => {
    setEditingField(field);
    setEditIndex(index);
    setEditValue(value);
  };

  // Handle Save in Edit Modal
  const handleSaveEdit = () => {
    if (editingField === "rank") {
      const updatedRanks = [...game.ranks];
      updatedRanks[editIndex] = editValue.trim();
      setGame({ ...game, ranks: updatedRanks });
    } else if (editingField === "role") {
      const updatedRoles = [...game.roles];
      updatedRoles[editIndex] = editValue.trim();
      setGame({ ...game, roles: updatedRoles });
    }
    setEditingField(null); // Close modal
    setEditValue(""); // Reset value
  };

  // Handle Remove Button
  const handleRemove = (field, index) => {
    if (field === "rank") {
      const updatedRanks = game.ranks.filter((_, i) => i !== index);
      setGame({ ...game, ranks: updatedRanks });
    } else if (field === "role") {
      const updatedRoles = game.roles.filter((_, i) => i !== index);
      setGame({ ...game, roles: updatedRoles });
    }
  };

  // Handle Image Upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        setGame({ ...game, image: reader.result });
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please upload a valid image file.");
    }
  };

  // Add New Rank
  const handleAddRank = () => {
    if (newRank.trim() && !game.ranks.includes(newRank.trim())) {
      setGame({ ...game, ranks: [...game.ranks, newRank.trim()] });
      setNewRank(""); // Reset input field
    } else {
      alert("Please enter a valid rank or avoid duplicates!");
    }
  };

  // Add New Role
  const handleAddRole = () => {
    if (newRole.trim() && !game.roles.includes(newRole.trim())) {
      setGame({ ...game, roles: [...game.roles, newRole.trim()] });
      setNewRole(""); // Reset input field
    } else {
      alert("Please enter a valid role or avoid duplicates!");
    }
  };

  // Save the game state
  const handleSaveGame = () => {
    console.log("Saved Game Data:", game);
    alert("Game details saved successfully!");
  };

  return (
    <>
      <HeaderAdmin />
      {game ? (
        <div className="game-detail-container-admin">
          <h1 className="game-detail-title-admin">Game Detail</h1>
          <div className="game-detail-content-admin">
            {/* Left Section */}
            <div className="game-detail-left-admin">
              {/* Game Name */}
              <div>
                <label>Game</label>
                <input
                  type="text"
                  value={game.name}
                  className="input-admin"
                  onChange={(e) => setGame({ ...game, name: e.target.value })}
                />
              </div>

              {/* Ranks Section */}
              <div>
                <label>Ranks</label>
                <div className="dropdown-admin">
                  <button
                    className="dropdown-toggle-admin"
                    onClick={() => toggleDropdown("rank")}
                  >
                    Toggle Ranks
                  </button>
                  {isRankDropdownOpen && (
                    <div className="dropdown-content-admin">
                      {game.ranks.map((rank, index) => (
                        <div className="dropdown-item-admin" key={index}>
                          <span>{rank}</span>
                          <div className="dropdown-actions-admin">
                            <a
                              href="#"
                              className="edit-link-admin"
                              onClick={() => handleEdit("rank", index, rank)}
                            >
                              Edit
                            </a>
                            <a
                              href="#"
                              className="remove-link-admin"
                              onClick={() => handleRemove("rank", index)}
                            >
                              Remove
                            </a>
                          </div>
                        </div>
                      ))}
                      {/* Add New Rank */}
                      <div className="dropdown-item-admin add-new-item">
                        <input
                          type="text"
                          placeholder="Add new rank"
                          value={newRank}
                          onChange={(e) => setNewRank(e.target.value)}
                          className="input-admin"
                        />
                        <button className="add-button-admin" onClick={handleAddRank}>
                          Add
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Roles Section */}
              <div>
                <label>Roles</label>
                <div className="dropdown-admin">
                  <button
                    className="dropdown-toggle-admin"
                    onClick={() => toggleDropdown("role")}
                  >
                    Toggle Roles
                  </button>
                  {isRoleDropdownOpen && (
                    <div className="dropdown-content-admin">
                      {game.roles.map((role, index) => (
                        <div className="dropdown-item-admin" key={index}>
                          <span>{role}</span>
                          <div className="dropdown-actions-admin">
                            <a
                              href="#"
                              className="edit-link-admin"
                              onClick={() => handleEdit("role", index, role)}
                            >
                              Edit
                            </a>
                            <a
                              href="#"
                              className="remove-link-admin"
                              onClick={() => handleRemove("role", index)}
                            >
                              Remove
                            </a>
                          </div>
                        </div>
                      ))}
                      {/* Add New Role */}
                      <div className="dropdown-item-admin add-new-item">
                        <input
                          type="text"
                          placeholder="Add new role"
                          value={newRole}
                          onChange={(e) => setNewRole(e.target.value)}
                          className="input-admin"
                        />
                        <button className="add-button-admin" onClick={handleAddRole}>
                          Add
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Description Section */}
              <div>
                <label>Description of this game</label>
                <textarea
                  value={game.description}
                  className="textarea-admin"
                  onChange={(e) =>
                    setGame({ ...game, description: e.target.value })
                  }
                ></textarea>
              </div>
            </div>

            {/* Right Section */}
            <div className="game-detail-right-admin">
              <img
                src={game.image}
                alt={`${game.name} cover`}
                className="game-image-admin"
              />
              <label className="edit-image-label-admin">Edit Image</label>
              <input
                type="file"
                className="edit-image-input-admin"
                onChange={handleImageUpload}
              />
            </div>
          </div>

          {/* Save Button */}
          <div className="game-detail-actions-admin">
            <button className="save-button-admin" onClick={handleSaveGame}>
              Save Game
            </button>
            <button
              className="remove-game-button-admin"
              onClick={() => setGame(null)}
            >
              Remove Game
            </button>
          </div>
        </div>
      ) : (
        <h1 className="game-detail-title-admin">Game Removed</h1>
      )}

      {/* Edit Modal */}
      {editingField && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Edit {editingField}</h2>
            <input
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="input-admin"
            />
            <div className="modal-buttons">
              <button className="save-button-admin" onClick={handleSaveEdit}>
                Save
              </button>
              <button
                className="cancel-button-admin"
                onClick={() => setEditingField(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GameDetailAdmin;