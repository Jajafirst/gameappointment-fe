import React from "react";
import "./adminDashboard.css";
import HeaderAdmin from "../../component/header-admin/header-admin"; // Ensure the path is correct
import { constraintsData } from "../../../data/adminConstraintsData"; // Ensure data is accessible

const AdminDashboard = () => {
  const playerAttributes = ["Player_ID", "Username", "Email", "Date Registered"];
  const gamerAttributes = ["Gamer_ID", "Profile_Pic", "Username", "Email", "Date Registered"];
  const gameAttributes = ["Order", "Game_Name", "Description", "Rank", "Role", "Game_Pic"];
  const timeSlotAttributes = ["Order", "Gamer_Name", "Game_Name", "Date", "Time"];
  const historyAttributes = ["Order", "Date", "Time", "Game_Name", "Gamer_Name", "Player_Name", "Status", "Review_Rate"];

  return (
    <>
      {/* Admin Header */}
      <HeaderAdmin />

      <div className="admin-dashboard">
        {/* Summary Section */}
        <h1 className="section-title">Overall Number</h1>
        <div className="summary-section-gamer">
          <div className="card-gamer">Total Players: {constraintsData.players.length}</div>
          <div className="card-gamer">Total Gamers: {constraintsData.gamers.length}</div>
          <div className="card-gamer">Total Games: {constraintsData.games.length}</div>
        </div>

        {/* Tables Section */}
        <h1 className="section-title">Table Overall</h1>
        <div className="table-overall-app">
          {/* Player List */}
          {constraintsData.players.length > 0 && (
            <div className="table-section-gamer" id="PlayerList">
              <h2>Player List</h2>
              <table>
                <thead>
                  <tr>
                    {playerAttributes.map((attr) => (
                      <th key={attr}>{attr}</th>
                    ))}
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {constraintsData.players.map((player, index) => (
                    <tr key={index}>
                      {playerAttributes.map((attr) => (
                        <td key={attr}>{player[attr] || "No data"}</td>
                      ))}
                      <td>
                        <button className="detail-btn-gamer">Detail</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Gamer List */}
          {constraintsData.gamers.length > 0 && (
            <div className="table-section-gamer" id="GamerList">
              <h2>Gamer List</h2>
              <table>
                <thead>
                  <tr>
                    {gamerAttributes.map((attr) => (
                      <th key={attr}>{attr}</th>
                    ))}
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {constraintsData.gamers.map((gamer, index) => (
                    <tr key={index}>
                      {gamerAttributes.map((attr) => (
                        <td key={attr}>{gamer[attr] || "No data"}</td>
                      ))}
                      <td>
                        <button className="detail-btn-gamer">Detail</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Game List */}
          {constraintsData.games.length > 0 && (
            <div className="table-section-gamer" id="GameList">
              <h2>Game List</h2>
              <table>
                <thead>
                  <tr>
                    {gameAttributes.map((attr) => (
                      <th key={attr}>{attr}</th>
                    ))}
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {constraintsData.games.map((game, index) => (
                    <tr key={index}>
                      {gameAttributes.map((attr) => (
                        <td key={attr}>{game[attr] || "No data"}</td>
                      ))}
                      <td>
                        <button className="detail-btn-gamer">Detail</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Time Slots */}
          {constraintsData.timeSlots.length > 0 && (
            <div className="table-section-gamer" id="AllAvailableTimeSlot">
              <h2>All Available Time Slot</h2>
              <table>
                <thead>
                  <tr>
                    {timeSlotAttributes.map((attr) => (
                      <th key={attr}>{attr}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {constraintsData.timeSlots.map((slot, index) => (
                    <tr key={index}>
                      {timeSlotAttributes.map((attr) => (
                        <td key={attr}>{slot[attr] || "No data"}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* History */}
          {constraintsData.history.length > 0 && (
            <div className="table-section-gamer" id="AllHistory">
              <h2>All History Schedule</h2>
              <table>
                <thead>
                  <tr>
                    {historyAttributes.map((attr) => (
                      <th key={attr}>{attr}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {constraintsData.history.map((entry, index) => (
                    <tr key={index}>
                      {historyAttributes.map((attr) => (
                        <td key={attr}>{entry[attr] || "No data"}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;