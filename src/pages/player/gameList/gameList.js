import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../component/header';
import { games } from '../../../data/gameData';
import '../../player/gameList/gameList.css';



const GameList = () => {
  const navigate = useNavigate(); // Enables navigation
  const [searchTerm, setSearchTerm] = useState('');

  const handleChooseGame = (gameName) => {
    console.log(`Navigating to: /gamerlist?game=${gameName}`); // Debug log
    navigate(`/gamerlist?game=${encodeURIComponent(gameName)}`);
  };

  const filteredGames = games.filter((game) =>
    game.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Header />
      <div className="game-list-container">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="game-list">
          {filteredGames.map((game, index) => (
            <div
              key={index}
              className="game-card"
              onClick={() => handleChooseGame(game.name)} // Navigate on click
              style={{ cursor: 'pointer' }}
            >
              <img src={game.image} alt={game.name} />
              <div className="game-info">
                <h4>Game</h4>
                <h3>{game.name}</h3>
                <p>{game.description}</p>
              </div>
            </div>
          ))}
          {filteredGames.length === 0 && <p>No games found.</p>}
        </div>
      </div>
    </div>
  );
};

export default GameList;