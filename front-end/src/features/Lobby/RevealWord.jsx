import React from "react";
import { Row, Col } from "react-bootstrap";
/**
 * Reveal the word at the end of each turn and how the user's performed
 * @param {object} props.revealWord - Object containing the word being drawn
 * @param {array<object>} props.turnPoints - Array containing every user's name and points
 * @returns {React.Component} Reveal Word component rendered
 */
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
