import React, { useState, useEffect } from "react";
import Header from "../../component/header";
import { getSchedules, saveSchedule } from "../../../data/timeSlotBookingData";
import "./schedule.css";

const Schedule = () => {
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

  const handleReview = (order, rate) => {
    if (rate < 1 || rate > 10) {
      alert("Rate must be between 1 and 10.");
      return;
    }

    const updatedHistory = schedule.history.map((item) =>
      item.order === order ? { ...item, reviewRate: `${rate}/10` } : item
    );

    const updatedSchedule = { ...schedule, history: updatedHistory };
    setSchedule(updatedSchedule);
    saveSchedule(loggedInPlayer.email, updatedSchedule);
  };

  return (
    <div>
      <Header />
      <div className="schedule-page">
        <div className="schedule-table-container">
          <div className="upcoming-schedule">
            <h2>Upcoming Schedule</h2>
            <table>
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Game Name</th>
                  <th>Gamer Name</th>
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

          <h2>Schedule History</h2>
          <table>
            <thead>
              <tr>
                <th>Order</th>
                <th>Game Name</th>
                <th>Gamer Name</th>
                <th>Date</th>
                <th>Time</th>
                <th>Review Rate</th>
              </tr>
            </thead>
            <tbody>
              {schedule.history.length > 0 ? (
                schedule.history.map((item) => (
                  <tr key={item.order}>
                    <td>{item.order}</td>
                    <td>{item.gameName}</td>
                    <td>{item.gamerName}</td>
                    <td>{item.date}</td>
                    <td>{item.time}</td>
                    <td>
                      {item.reviewRate || (
                        <input
                          type="number"
                          placeholder="Rate 1-10"
                          min="1"
                          max="10"
                          onBlur={(e) =>
                            handleReview(item.order, e.target.value)
                          }
                        />
                      )}
                    </td>
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
  );
};

export default Schedule;