const scheduleData = {
    players: [
      {
        id: 1,
        name: "Player1",
        email: "player1@example.com",
        schedules: {
          upcoming: [
            {
              game: "Valorant",
              gamer: "Tenz",
              date: "2024-11-20",
              time: "07:00 AM - 09:00 AM",
            },
          ],
          history: [
            {
              game: "Valorant",
              gamer: "Shroud",
              date: "2024-10-15",
              time: "06:00 PM - 08:00 PM",
              review: "9/10",
            },
          ],
        },
      },
      {
        id: 2,
        name: "Player2",
        email: "player2@example.com",
        schedules: {
          upcoming: [],
          history: [],
        },
      },
    ],
  };
  
  export default scheduleData;