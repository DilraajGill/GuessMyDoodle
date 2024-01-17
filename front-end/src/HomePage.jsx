import React, { useEffect } from "react";
import axios from "axios";
import { authContext } from "./App";
import { useNavigate } from "react-router-dom";
import checkAuthentication from "./checkAuthentication";
import getPublic from "./getPublic";
import LobbyCard from "./LobbyCard";
import { Container, Button } from "react-bootstrap";
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
          points: response.points,
          tools: response.tools,
        });
      } else {
        // If not signed in, navigate them to the /login page
        navigation("/login");
      }
    }
    async function loadLobbies() {
      const response = await getPublic({ axios });
      console.log(response.data);
      setLobbies(response.data);
    }
    ensureLogin();
    loadLobbies();
  }, []);
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

  function handleLobbyClick(lobbyId) {
    navigation(`/lobby/${lobbyId}`);
  }

  return (
    <Container>
      <h1>Home Page</h1>
      <h2>Welcome {signedIn.username}</h2>
      <h2>Your Points: {signedIn.points}</h2>
      <Button variant="primary" onClick={createLobby}>
        Create Lobby!
      </Button>
      <div>
        {lobbies.map((lobby) => (
          <LobbyCard
            key={lobby.id}
            lobby={lobby}
            onClick={() => handleLobbyClick(lobby.id)}
          />
        ))}
      </div>
    </Container>
  );
}

export default HomePage;
