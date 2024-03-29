import React, { useEffect } from "react";
import axios from "axios";
import { authContext } from "../../App";
import { useNavigate, useLocation } from "react-router-dom";
import getPublic from "../../components/GetPublic";
import LobbyCard from "../Lobby/LobbyCard";
import { Container, Button, Row, Col, Dropdown, Modal } from "react-bootstrap";
import PictureSelector from "./PictureSelector";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../../styles/HomePage.css";
/**
 * @class HomePage
 * Displays the home page for the User
 */
function HomePage() {
  // Access context from app and define navigation object
  const [signedIn, setSignedIn] = React.useContext(authContext);
  const [lobbies, setLobbies] = React.useState([]);
  const navigation = useNavigate();
  const [showKickedModal, setShowKickedModal] = React.useState(false);
  const location = useLocation();

  // Ensure the user is signed in
  /**
   * Ensure the user is authenticated to proceed further
   */
  async function loadLobbies() {
    const response = await getPublic({ axios });
    setLobbies(response.data);
  }
  useEffect(() => {
    loadLobbies();
  }, []);

  useEffect(() => {
    if (location.state?.kicked) {
      setShowKickedModal(true);
    }
  }, [location]);
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

  const [changePicture, setChangePicture] = React.useState(false);

  async function signOut() {
    try {
      const status = await axios.get("/auth/sign-out");
      if (!status.data.auth) {
        setSignedIn({
          auth: false,
        });
        navigation("/login");
      }
    } catch (error) {
      console.log("Unable to sign out");
    }
  }
  return (
    <Container
      fluid
      className="min-vh-100 d-flex align-items-center justify-content-center"
    >
      <Col md={3} />
      <Col md={6}>
        <Col md={12} className="profile">
          <Dropdown>
            <Dropdown.Toggle variant="link">
              <img
                className="profile-picture"
                src={signedIn.profilePicture}
                alt={`${signedIn.username}'s Profile'`}
              />
              <span className="ms-2 profile-username">{signedIn.username}</span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setChangePicture(true)}>
                Change Icon
              </Dropdown.Item>
              <Dropdown.Item onClick={() => signOut()}>Sign Out</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col md={12} className="home-page">
          <Row className="top-bar align-items-center text-center">
            <Col md={4}>
              <div className="toolbar">
                <Button
                  variant="primary"
                  onClick={() => loadLobbies()}
                  className="me-3"
                >
                  <i class="bi bi-arrow-clockwise"></i>
                </Button>
                <Button
                  className="me-3"
                  variant="primary"
                  onClick={() => navigation("/store")}
                >
                  <i class="bi bi-cart-fill"></i>
                </Button>
              </div>
            </Col>
            <Col md={4}>
              <h2>Home</h2>
            </Col>
            <Col md={4}>
              <div className="points-container text-right mr-3">
                <div className="points-label">Points</div>
                <div className="points-value">
                  <strong>{signedIn.points}</strong>
                </div>
              </div>
            </Col>
          </Row>
          <Col md={12}>
            <div className="room-container mt-2">
              {lobbies.length > 0 ? (
                <Row xs={1} md={3} lg={4}>
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
              ) : (
                <div className="no-lobbies">
                  <img
                    alt="cross"
                    src="./cross.png"
                    style={{ width: "400px", height: "400px" }}
                  />
                  <br />
                  <h3>No Lobbies Available</h3>
                </div>
              )}
            </div>
          </Col>
          <div className="create-lobby mt-3">
            <Button variant="primary" onClick={createLobby}>
              Create Lobby!
            </Button>
          </div>
        </Col>
      </Col>
      <Col md={3} />
      <PictureSelector
        showModal={changePicture}
        setShowModal={setChangePicture}
        currentPicture={signedIn.profilePicture}
        availablePictures={signedIn.purchasedProfilePicture}
      />
      <Modal show={showKickedModal} onHide={() => setShowKickedModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Kicked From Lobby!</Modal.Title>
        </Modal.Header>
        <Modal.Body>{location.state?.message}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowKickedModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default HomePage;
