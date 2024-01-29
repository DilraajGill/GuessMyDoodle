import React from "react";
import { Card } from "react-bootstrap";
function PlayerCard({ player, points, colour, drawing }) {
  return (
    <Card>
      <Card.Body>
        <Card.Title>
          {player} {drawing && <i class="bi bi-pencil-fill"></i>}
        </Card.Title>
        <Card.Text>Points: {points}</Card.Text>
      </Card.Body>
    </Card>
  );
}
export default PlayerCard;
