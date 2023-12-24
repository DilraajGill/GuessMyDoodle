import React, { useEffect } from "react";
import axios from "axios";
import { authContext } from "./App";
import { useNavigate } from "react-router-dom";
import checkAuthentication from "./checkAuthentication";
/**
 * @class HomePage
 * Displays the home page for the User
 */
function HomePage() {
  // Access context from app and define navigation object
  const [signedIn, setSignedIn] = React.useContext(authContext);
  const [lobbies, setLobbies] = React.useState([]);
  const navigation = useNavigate();

  // Ensure the user is signed in
  /**
   * Ensure the user is authenticated to proceed further
   */
  useEffect(() => {
    async function ensureLogin() {
      const response = await checkAuthentication({ axios });
      if (response.auth) {
        setSignedIn({
          auth: true,
          username: response.username,
          // Temporary points assignment
          points: response.points,
        });
      } else {
        // If not signed in, navigate them to the /login page
        navigation("/login");
      }
    }
    async function loadLobbies() {
      const response = await axios.get("/get-public");
      setLobbies(response);
    }
    ensureLogin();
  });
  /**
   * Create a lobby with a random unique ID and navigate to it
   */
  async function createLobby() {
    try {
      // Communicate with back-end to make lobby and navigate to this lobby
      const response = await axios.post("/create-lobby");
      const lobbyId = response.data.lobbyId;
      navigation(`/lobby/${lobbyId}`);
    } catch (error) {
      console.log("Error making lobby");
    }
  }

  return (
    <div>
      <h1>Home Page</h1>
      <h2>Welcome {signedIn.username}</h2>
      <h2>Your Points: {signedIn.points}</h2>
      <button onClick={createLobby}>Create Lobby!</button>
      <div></div>
    </div>
  );
}

export default HomePage;
