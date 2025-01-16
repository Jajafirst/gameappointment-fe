import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login/login';
import GameList from './pages/player/gameList/gameList'; // Player's game list
import GamerList from './pages/player/gamerList/gamerList'; // Player's gamer list
import GamerTimeSlotSelection from './pages/player/gamerTimeSlotSelection/gamerTimeSlotSelection'; // Time slot selection
import Schedule from "./pages/player/schedule/schedule"; // Schedule page
import GamePage from "./pages/gamer/gamePage/gamePage"; // Gamer's game management page
import AddTimeSlotGamer from "./pages/gamer/addTimeSlotGamer/addTimeSlotGamer"; // Adjust path based on your folder structure
import ScheduleGamer from './pages/gamer/scheduleGamer/scheduleGamer';
import AdminDashboard from './pages/admin/adminDashboard/adminDashboard'; // Add this import
import AdminAddGame from './pages/admin/addGameAdmin/addGameAdmin'
import GameDetailAdmin from './pages/admin/gameDetailAdmin/gameDetailAdmin'



const App = () => {
  return (
    <Router>
      <Routes>
        {/* Common Login */}
        <Route path="/" element={<Login />} />

        {/* Player Routes */}
        <Route path="/gameList" element={<GameList />} />
        <Route path="/gamerlist" element={<GamerList />} />
        <Route path="/gamerTimeSlotSelection" element={<GamerTimeSlotSelection />} />
        <Route path="/schedule" element={<Schedule />} />

        {/* Gamer Routes */}
        <Route path="/game" element={<GamePage />} />
        <Route path="/time" element={<AddTimeSlotGamer />} />
        <Route path="/scheduleGamer" element={<ScheduleGamer />} />

        {/* Admin Route */}
        <Route path="/adminDashboard" element={<AdminDashboard />} />
        <Route path="/adminAddGame" element={<AdminAddGame />} /> {/* Add this route */}
        <Route path="/gameDetailAdmin" element={<GameDetailAdmin />} />
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
};

export default App;