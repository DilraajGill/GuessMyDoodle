import React from "react";
import { Row, Col } from "react-bootstrap";

function RevealWord({ revealWord, turnPoints }) {
  return (
    <div className="reveal-word">
      {/* Reveal word at the end of the user's turn */}
      <h2>The word was {revealWord.word}</h2>
      <Row className="justify-content-md-center reveal-points">
        {turnPoints.map((player, index) => (
          <Col md={12} key={index} className="player-point-container">
            <span className="player-name">{player.username}:</span>

            <span className="player-points">{player.value}</span>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default RevealWord;
