import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Form, Card, ToggleButtonGroup, ToggleButton } from "react-bootstrap";
/**
 * Allow for customisation of gameplay settings
 * @class GameCustomisation
 * @param {object} socket
 * @param {number} rounds
 * @param {number} minutes
 */
function GameCustomisation({
  socket,
  rounds,
  minutes,
  lobbyType,
  customWords,
}) {
  // Update the number of rounds being modified
  /**
   * Update the number of rounds being played
   * @param {mouseEvent} ev
   */
  function roundUpdate(ev) {
    socket.emit("update-rounds", ev.target.value);
  }
  // Update the number of minutes being modified
  /**
   * Update the number of minutes being played
   * @param {mouseEvent} ev
   */
  function minutesUpdate(ev) {
    socket.emit("update-minutes", ev.target.value);
  }

  function privacyUpdate(ev) {
    socket.emit("update-privacy", ev);
  }

  function wordsUpdate(ev) {
    socket.emit("update-words", ev.target.value);
  }
  // Start the game if the user has correct permissions
  /**
   * If the user has the correct permissions, start the game
   */
  function startGame() {
    socket.emit("start-game");
  }

  return (
    <div>
      <Card>
        <Card.Body>
          <Form>
            <ToggleButtonGroup type="radio" name="lobbyType" value={lobbyType}>
              <ToggleButton
                value="private"
                onClick={() => privacyUpdate("private")}
              >
                Private
              </ToggleButton>
              <ToggleButton
                value="public"
                onClick={() => privacyUpdate("public")}
              >
                Public
              </ToggleButton>
            </ToggleButtonGroup>
            <Form.Group>
              <Form.Label>Number of Rounds</Form.Label>
              <Form.Control
                type="range"
                min="1"
                max="6"
                value={rounds}
                onChange={roundUpdate}
              ></Form.Control>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
      <label>
        Number of Rounds
        <input
          type="range"
          min="1"
          max="6"
          value={rounds}
          onChange={roundUpdate}
        />
      </label>
      <br />
      <label>
        Number of Minutes
        <input
          type="range"
          min="1"
          max="3"
          value={minutes}
          onChange={minutesUpdate}
        />
      </label>
      <br />
      <label>
        Custom words
        <textarea
          value={customWords}
          onChange={wordsUpdate}
          rows={5}
          cols={50}
          placeholder="Separate words by adding a comma (,)"
        />
      </label>
      <br />
      <button onClick={startGame}>Start Game</button>
    </div>
  );
}

export default GameCustomisation;
