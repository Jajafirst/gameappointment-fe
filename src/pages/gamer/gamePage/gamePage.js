import React, { useState } from "react";
import { gameAdd } from "../../../data/gameAdd";
import "../../gamer/gamePage/gamePage.css";

import HeaderGamer from "../../component/header-gamer/header-gamer";

const GamePage = () => {
  const [games, setGames] = useState([]);
  const [formData, setFormData] = useState({
    game: "",
    rank: "",
    role: [],
    description: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  const selectedGame = gameAdd.find((game) => game.name === formData.game);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "game") {
      setFormData({ ...formData, game: value, rank: "", role: [] });
    }
  };

  const handleRoleChange = (role, isChecked) => {
    if (isChecked) {
      setFormData({ ...formData, role: [...formData.role, role] });
    } else {
      setFormData({
        ...formData,
        role: formData.role.filter((r) => r !== role),
      });
    }
  };

  const handleAddOrUpdateGame = () => {
    if (isEditing) {
      const updatedGames = [...games];
      updatedGames[editingIndex] = formData;
      setGames(updatedGames);
    } else {
      setGames([...games, formData]);
    }
    resetForm();
  };

  const handleEditGame = (index) => {
    setFormData(games[index]);
    setIsEditing(true);
    setEditingIndex(index);
  };

  const handleDeleteGame = (index) => {
    const updatedGames = games.filter((_, i) => i !== index);
    setGames(updatedGames);

    if (isEditing && editingIndex === index) {
      resetForm();
    }
  };

  const resetForm = () => {
    setFormData({ game: "", rank: "", role: [], description: "" });
    setIsEditing(false);
    setEditingIndex(null);
  };

  return (
    <div>
      < HeaderGamer/>
      <div className="game-page-gamer">
        <h1>Game Management</h1>
        <div className="grid-container-gamer">
          <div className="form-container-gamer">
            <h2>{isEditing ? "Edit Game" : "Add Game"}</h2>

            <label>Game</label>
            <select
              name="game"
              value={formData.game}
              onChange={handleInputChange}
            >
              <option disabled value="">
                Select a Game
              </option>
              {gameAdd.map((game, index) => (
                <option key={index} value={game.name}>
                  {game.name}
                </option>
              ))}
            </select>

            <label>Rank</label>
            <select
              name="rank"
              value={formData.rank}
              onChange={handleInputChange}
              disabled={!formData.game}
            >
              <option disabled value="">
                Select a Rank
              </option>
              {formData.game &&
                selectedGame.ranks.map((rank, index) => (
                  <option key={index} value={rank}>
                    {rank}
                  </option>
                ))}
            </select>

            <label>Role</label>
            <div className="role-options-container-gamer">
              {formData.game &&
                selectedGame.roles.map((role, index) => (
                  <label key={index}>
                    <input
                      type="checkbox"
                      value={role}
                      checked={formData.role.includes(role)}
                      onChange={(e) =>
                        handleRoleChange(role, e.target.checked)
                      }
                    />
                    {role}
                  </label>
                ))}
            </div>

            <label>Description (Max 300 Characters)</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              maxLength={300}
              placeholder="Describe your skills in this game..."
            />
            <div className="button-row-gamer">
              <button
                onClick={handleAddOrUpdateGame}
                disabled={!formData.game || !formData.rank || formData.role.length === 0}
              >
                {isEditing ? "Save Changes" : "Add Game"}
              </button>

              {isEditing && (
                <button className="cancel-button" onClick={resetForm}>
                  Cancel
                </button>
              )}
            </div>
          </div>

          <div className="game-list-container-gamer">
            <h2>Game</h2>
            <div className="game-list-gamer">
              {games.length > 0 ? (
                games.map((game, index) => (
                  <div key={index} className="game-card-gamer">
                    <p>{game.game}</p>
                    <div className="detail-gamecard-gamer">
                      <button onClick={() => handleEditGame(index)}>Edit</button>
                      <button onClick={() => handleDeleteGame(index)}>
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p>No games added yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamePage;