const SCHEDULE_KEY = "schedules";

export const getSchedules = () => {
  const schedules = JSON.parse(localStorage.getItem(SCHEDULE_KEY)) || {};
  return schedules;
};

export const saveSchedule = (email, schedule) => {
  const schedules = getSchedules();
  schedules[email] = schedule;
  localStorage.setItem(SCHEDULE_KEY, JSON.stringify(schedules));
};

export const addUpcomingSchedule = (email, newSchedule) => {
  const schedules = getSchedules();
  if (!schedules[email]) {
    schedules[email] = { upcoming: [], history: [] };
  }
  schedules[email].upcoming.push(newSchedule);
  localStorage.setItem(SCHEDULE_KEY, JSON.stringify(schedules));
};

export const addSampleSchedules = () => {
  const sampleSchedules = {
    "player1@example.com": {
      upcoming: [
        {
          order: 1,
          gameName: "Valorant",
          gamerName: "Gamer 1",
          date: "2023-12-21",
          time: "10:00 AM",
        },
      ],
      history: [
        {
          order: 2,
          gameName: "Call of Duty",
          gamerName: "Gamer 2",
          date: "2023-12-20",
          time: "02:00 PM",
          reviewRate: "9/10",
        },
      ],
    },
  };
  localStorage.setItem(SCHEDULE_KEY, JSON.stringify(sampleSchedules));
};