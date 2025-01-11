import React, { useState, useEffect } from "react";
import HeaderGamer from "../../component/header-gamer/header-gamer";
import { getSchedules } from "../../../data/timeSlotBookingData"; // Removed 'saveSchedule'
import "./scheduleGamer.css";

const ScheduleGamer = () => {
  const [schedule, setSchedule] = useState({ upcoming: [], history: [] });
  const loggedInPlayer = JSON.parse(localStorage.getItem("loggedInPlayer"));

  useEffect(() => {
    if (loggedInPlayer) {
      const schedules = getSchedules(loggedInPlayer.email) || {
        upcoming: [],
        history: [],
      };
      setSchedule(schedules);
    }
  }, [loggedInPlayer]);

  return (
    <div>
      <HeaderGamer />
      <div className="schedule-page-gamer">
        <div className="schedule-table-container-gamer">
          {/* Upcoming Schedule Table */}
          <div className="upcoming-schedule-gamer">
            <h2 className="schedule-title-gamer">Upcoming Schedule Table</h2>
            <table className="schedule-table-gamer">
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Game_Name</th>
                  <th>Player_Name</th>
                  <th>Date</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {schedule.upcoming.length > 0 ? (
                  schedule.upcoming.map((item) => (
                    <tr key={item.order}>
                      <td>{item.order}</td>
                      <td>{item.gameName}</td>
                      <td>{item.gamerName}</td>
                      <td>{item.date}</td>
                      <td>{item.time}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">No upcoming appointments.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Time Slot History Table */}
          <div className="history-schedule-gamer">
            <h2 className="schedule-title-gamer">Time Slot History</h2>
            <table className="schedule-table-gamer">
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Game_Name</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Status</th>
                  <th>Player_Name</th>
                </tr>
              </thead>
              <tbody>
                {schedule.history.length > 0 ? (
                  schedule.history.map((item) => (
                    <tr key={item.order}>
                      <td>{item.order}</td>
                      <td>{item.gameName}</td>
                      <td>{item.date}</td>
                      <td>{item.time}</td>
                      <td>{item.status || "unreserved"}</td>
                      <td>{item.gamerName}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6">No history available.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleGamer;