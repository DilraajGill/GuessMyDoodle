import React from "react";
import { Card, Col, Row } from "react-bootstrap";
function PlayerCard({ player, points, picture, drawing, host }) {
  const address = `../${picture}`;
  return (
    <>
      <Card>
        <Row>
          <Col md={3}>
            <Card.Img variant="top" src={address} style={{ height: "100%" }} />
          </Col>
          <Col md={9}>
            <Card.Body>
              <Card.Title>
                {player}
                {host && <i className="bi bi-star-fill"></i>}
                {drawing && <i class="bi bi-pencil-fill"></i>}
              </Card.Title>
              <Card.Text style={{ display: "block" }}>
                Points: {points}
              </Card.Text>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </>
  );
}
export default PlayerCard;
