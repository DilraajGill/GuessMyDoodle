import React from "react";
import { Card, Button } from "react-bootstrap";

/**
 * Component to display lobby information alongside Join button
 * @param {object} props.lobby Object containing information regarding host username, icon, player count and id
 * @param {Function} props.onClick Function to be called upon when button is clicked
 * @returns {React.Component} Lobby Card component
 */
function LobbyCard({ lobby, onClick }) {
  return (
    <Card className="lobby-card">
      <Card.Img
        variant="top"
        src={lobby.icon}
        style={{ borderRadius: "10px" }}
      />
      <Card.Body>
        <Card.Title>
          {lobby.host}
          <span className="lobby-id"> #{lobby.id}</span>
        </Card.Title>
        <Card.Text>Players: {lobby.playerCount}</Card.Text>
        <Button
          variant="secondary"
          onClick={onClick}
          data-testid="lobby-button"
        >
          Join Lobby!
        </Button>
      </Card.Body>
    </Card>
  );
}

export default LobbyCard;
