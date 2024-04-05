import React from "react";
import { Card, Col, Row } from "react-bootstrap";
/**
 * Component to display each player's information
 * @param {} props.player Player username
 * @param {} props.points Points accumulated by the player
 * @param {} props.picture Path of the player's pictre
 * @param {} props.drawing Indicate if the player is drawing
 * @param {} props.host Indicate if the player is the host
 * @param {} props.kick Function to call if they are to be kicked from the lobby
 * @returns
 */
function PlayerCard({ player, points, picture, drawing, host, kick }) {
  const address = `../${picture}`;

  return (
    <Card
      className="mb-2"
      style={{ cursor: "pointer" }}
      onClick={() => kick(player)}
    >
      <Row noGutters className="align-items-center">
        <Col xs={3} className="d-flex justify-content-center">
          <Card.Img variant="top" src={address} className="img-fluid" />
        </Col>
        <Col xs={9} className="p-2">
          <Card.Body className="p-0">
            <Card.Title className="mb-0">
              {player}
              {host && (
                <i className="bi bi-star-fill ms-2" data-testid="host-icon"></i>
              )}
              {drawing && (
                <i
                  className="bi bi-pencil-fill ms-2"
                  data-testid="drawing-icon"
                ></i>
              )}
            </Card.Title>
            <Card.Text>Points: {points}</Card.Text>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
}

export default PlayerCard;
