import React from "react";
import { Card } from "react-bootstrap";
function PlayerCard({ player, points, colour }) {
  return (
    <Card>
      <Card.Body>
        <Card.Title>{player}</Card.Title>
        <Card.Text>Points: {points}</Card.Text>
      </Card.Body>
    </Card>
  );
}
export default PlayerCard;
