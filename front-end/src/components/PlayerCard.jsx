import React from "react";
import { Card, Col, Row } from "react-bootstrap";
function PlayerCard({ player, points, picture, drawing, host, kick }) {
  const address = `../${picture}`;

  function kickUser() {
    kick(player);
  }

  return (
    <>
      <Card style={{ cursor: "pointer" }} onClick={kickUser}>
        <Row>
          <Col md={3}>
            <Card.Img variant="top" src={address} style={{ height: "100%" }} />
          </Col>
          <Col md={9}>
            <Card.Body>
              <Card.Title>
                {player}
                <div className="ms-1" style={{ display: "inline-block" }}>
                  {host && (
                    <i className="bi bi-star-fill" data-testid="host-icon"></i>
                  )}
                </div>
                <div className="ms-1" style={{ display: "inline-block" }}>
                  {drawing && (
                    <i
                      className="bi bi-pencil-fill"
                      data-testid="drawing-icon"
                    ></i>
                  )}
                </div>
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
