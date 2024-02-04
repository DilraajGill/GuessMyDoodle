import React, { useEffect } from "react";
import axios from "axios";
import { authContext } from "./App";
import { useNavigate } from "react-router-dom";
import checkAuthentication from "./checkAuthentication";
import getPublic from "./getPublic";
import LobbyCard from "./LobbyCard";
import { Container, Button, Row, Col, Card } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./HomePage.css";
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
  async function loadLobbies() {
    const response = await getPublic({ axios });
    setLobbies(response.data);
  }
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
    <Container className="text-center home-page">
      <div className="top-bar d-flex justify-content-between align-items-center">
        <div className="toolbar">
          <Button
            className="me-3"
            variant="primary"
            onClick={() => navigation("/store")}
          >
            Go To Store!
          </Button>
          <Button
            variant="primary"
            onClick={() => loadLobbies()}
            className="me-3"
          >
            <i class="bi bi-arrow-clockwise"></i>
          </Button>
        </div>

        <div className="points-container text-right mr-3">
          <div className="points-label">Points</div>
          <div className="points-value">
            <strong>{signedIn.points.toLocaleString()}</strong>
          </div>
        </div>
      </div>
      <h2>Welcome {signedIn.username}</h2>
      <div className="toolbar">
        <Button variant="primary" onClick={createLobby} className="me-3">
          Create Lobby!
        </Button>
      </div>
      <br />
      <Row xs={1} md={3} lg={5}>
        {lobbies.map((lobby) => (
          <Col>
            <LobbyCard
              key={lobby.id}
              lobby={lobby}
              onClick={() => handleLobbyClick(lobby.id)}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default HomePage;
