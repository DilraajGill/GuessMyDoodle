import React from "react";
import { Card, Button } from "react-bootstrap";

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
