import React, { useState } from "react";
import "./addTimeSlotGamer.css";
import { gamerData } from "../../../data/gamerData";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import HeaderGamer from "../../component/header-gamer/header-gamer";

const customTheme = createTheme({
  palette: {
    primary: {
      main: "#e5062f", // Red for primary actions
    },
    text: {
      primary: "#ffffff", // White text
      secondary: "#aaaaaa", // Grey text for secondary labels
    },
    background: {
      paper: "#111", // Black background for popups
    },
  },
  components: {
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: "#444", // Red for icons
          "&:hover": {
            color: "#e5062f", // White on hover
          },
        },
      },
    },
    MuiPickersDay: {
      styleOverrides: {
        root: {
          color: "#ffffff", // Default day color
          "&.Mui-selected": {
            backgroundColor: "#e5062f", // Red for selected day
            color: "#ffffff", // White text for selected day
          },
          "&:hover": {
            backgroundColor: "#d00429", // Darker red on hover
          },
        },
      },
    },
  },
  typography: {
    fontFamily: "Arial, sans-serif", // Ensures consistent typography
  },
});

const AddTimeSlotGamer = () => {
  const [gameName, setGameName] = useState("");
  const [date, setDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);

  const handleAddTime = () => {
    if (gameName && date && startTime && endTime) {
      const formattedDate = date.format("DD/MM/YYYY");
      const newTimeSlot = {
        order: timeSlots.length + 1,
        gameName,
        date: formattedDate,
        time: `${startTime.format("hh:mm A")} - ${endTime.format("hh:mm A")}`,
      };
      setTimeSlots([...timeSlots, newTimeSlot]);
      setGameName("");
      setDate(null);
      setStartTime(null);
      setEndTime(null);
    } else {
      alert("Please fill out all fields.");
    }
  };

  const handleRemoveTimeSlot = (order) => {
    setTimeSlots(timeSlots.filter((slot) => slot.order !== order));
  };

  return (
    <ThemeProvider theme={customTheme}>
      <HeaderGamer />
      <div className="add-time-slot-gamer-container">
        <h1 className="add-time-slot-gamer-title">Time Slot Management</h1>

        <div className="add-time-slot-gamer-form">
          <div className="form-group-gamer">
            <select
          
              id="game-select-gamer"
              value={gameName}
              onChange={(e) => setGameName(e.target.value)}
            >
              
              <option value="">Select Game</option>
              {gamerData.flatMap((gamer) =>
                gamer.games.map((game, index) => (
                  <option key={index} value={game.game}>
                    {game.game}
                  </option>
                ))
              )}
            </select>
          </div>

          <div className="form-group-gamer">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Select Date"
                value={date}
                onChange={(newValue) => setDate(newValue)}
              />
            </LocalizationProvider>
          </div>

          <div className="form-group-gamer">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                label="Start Time"
                value={startTime}
                onChange={(newValue) => setStartTime(newValue)}
                ampm
                minutesStep={15}
              />
            </LocalizationProvider>
          </div>

          <div className="form-group-gamer">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                label="End Time"
                value={endTime}
                onChange={(newValue) => setEndTime(newValue)}
                ampm
                minutesStep={15}
              />
            </LocalizationProvider>
          </div>

          <button className="add-time-slot-gamer-btn" onClick={handleAddTime}>
            Add Time
          </button>
        </div>

        <div className="time-slot-gamer-table-container">
          <h2 className="time-slot-gamer-title">Time Slots Available</h2>
          <table className="time-slot-gamer-table">
            <thead>
              <tr>
                <th>Order</th>
                <th>Game Name</th>
                <th>Date</th>
                <th>Time</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {timeSlots.length > 0 ? (
                timeSlots.map((slot) => (
                  <tr key={slot.order}>
                    <td>{slot.order}</td>
                    <td>{slot.gameName}</td>
                    <td>{slot.date}</td>
                    <td>{slot.time}</td>
                    <td>
                      <button
                        className="remove-time-slot-gamer-btn"
                        onClick={() => handleRemoveTimeSlot(slot.order)}
                      >
                        REMOVE
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No time slots available.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default AddTimeSlotGamer;