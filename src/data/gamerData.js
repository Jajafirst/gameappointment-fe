import TenzImage from "../image/tenzProfile.jpg"; // Replace with the correct path
import ShroudImage from "../image/akatsuki-splattered-with-red-and-black-0tydaaioqxabopb0.jpg"; // Replace with the correct path

export const gamerData = [
  {
    id: 1,
    name: "Tenz",
    image: TenzImage, // Corrected to use an imported image
    description: "Tenz is a professional gamer known for his aggressive playstyle.",
    games: [
      {
        game: "Valorant",
        rank: "Radiant",
        role: "Duelist, Controller",
        review: "8",
        description: "Pro gamer specializing in aggressive playstyle.",
        timeSlots: [
          { id: 1, date: "20-11-2024", time: "07:00 AM - 09:00 AM", available: true },
          { id: 2, date: "22-11-2024", time: "07:00 AM - 09:00 AM", available: false },
        ],
      },
      {
        game: "ROV",
        rank: "Diamond",
        role: "Support",
        review: 8,
        description: "Experienced in team play and making impactful decisions.",
        timeSlots: [
          { id: 3, date: "25-11-2024", time: "10:00 AM - 12:00 PM", available: true },
          { id: 4, date: "27-11-2024", time: "08:00 AM - 10:00 AM", available: false },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Shroud",
    image: ShroudImage, // Corrected to use an imported image
    description: "Shroud is known for precise aim and calm gameplay.",
    games: [
      {
        game: "Valorant",
        rank: "Immortal",
        role: "Sentinel",
        review: 8,
        description: "Precise aim and calm gameplay under pressure.",
        timeSlots: [
          { id: 5, date: "21-11-2024", time: "08:00 AM - 10:00 AM", available: true },
        ],
      },
    ],
  },
];

export default gamerData;