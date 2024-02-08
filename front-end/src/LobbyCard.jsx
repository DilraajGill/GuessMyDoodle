import React from "react";
import { Card, Button } from "react-bootstrap";

function LobbyCard({ lobby, onClick }) {
  return (
    <Card className="lobby-card" onClick={onClick}>
      <Card.Body>
        <Card.Title>{lobby.id}</Card.Title>
        <Card.Text>Players: {lobby.playerCount}</Card.Text>
        <Button variant="secondary" onClick={onClick}>
          Join Lobby!
        </Button>
      </Card.Body>
    </Card>
  );
}

export default LobbyCard;
