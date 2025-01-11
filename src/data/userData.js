import Tenz from "../image/tenzProfile.jpg"
const initialUsers = [
    {
      username: "FirstZ",
      email: "firstz@gmail.com",
      password: "FirstZ0101", // Password must be hashed in real-world apps
      role: "Player", // Role: "Player" or "Gamer"
    },
    {
      username: "Tenz",
      email: "tenz@gmail.com",
      password: "Tenz1234",
      role: "Gamer",
      Image : Tenz
    },
  ];
  
  // Save the initial users to localStorage if not already present
  if (!localStorage.getItem("users")) {
    localStorage.setItem("users", JSON.stringify(initialUsers));
  }
  
  export const getUsers = () => JSON.parse(localStorage.getItem("users")) || [];
  
  export const saveUser = (newUser) => {
    const users = getUsers();
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
  };
 