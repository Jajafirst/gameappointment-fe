import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../../component/header";
import GamerCard from "./gamerCard";
import gamerData from "../../../data/gamerData";
import "./gamerList.css";

const GamerList = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedGame = queryParams.get("game");

  // Filter gamers who play the selected game
  const filteredGamers = gamerData
    .map((gamer) => {
      const game = gamer.games.find(
        (g) => g.game.toLowerCase() === selectedGame?.toLowerCase()
      );
      return game ? { ...gamer, selectedGameDetails: game } : null;
    })
    .filter((gamer) => gamer !== null); // Remove nulls

  return (
    <div>
      <Header />
      <div className="gamerlist-container">
        <div className="title">
          <h1>Gamers for {selectedGame}</h1>
        </div>
        <div className="gamer-list">
          {filteredGamers.length > 0 ? (
            filteredGamers.map((gamer) => (
              <GamerCard
                key={gamer.id}
                gamer={gamer}
                gameDetails={gamer.selectedGameDetails}
              />
            ))
          ) : (
            <p className="no-gamers">No gamers found for {selectedGame}.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GamerList;