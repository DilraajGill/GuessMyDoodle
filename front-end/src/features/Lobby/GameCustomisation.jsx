import React from "react";
import {
  Form,
  Card,
  ToggleButtonGroup,
  ToggleButton,
  Button,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
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
  length,
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
            <Form.Label>Lobby Type</Form.Label>
            <br />
            <ToggleButtonGroup type="radio" name="lobbyType" value={lobbyType}>
              <ToggleButton
                value="private"
                onClick={() => privacyUpdate("private")}
                data-testid="private-lobby-toggle"
              >
                Private
              </ToggleButton>
              <ToggleButton
                value="public"
                onClick={() => privacyUpdate("public")}
                data-testid="public-lobby-toggle"
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
                data-testid="round-updates"
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Number of Minutes</Form.Label>
              <Form.Control
                type="range"
                min="1"
                max="3"
                value={minutes}
                onChange={minutesUpdate}
                data-testid="timer-update"
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Custom Words</Form.Label>
              <Form.Control
                as="textarea"
                value={customWords}
                onChange={wordsUpdate}
                placeholder="Separate words by adding a comma (,)"
              ></Form.Control>
            </Form.Group>
            <br />
            {length <= 1 ? (
              <OverlayTrigger
                placement="bottom"
                overlay={
                  <Tooltip>Cannot start game with only 1 player!</Tooltip>
                }
              >
                <Button disabled={length <= 1} onClick={startGame}>
                  Start Game
                </Button>
              </OverlayTrigger>
            ) : (
              <Button disabled={length <= 1} onClick={startGame}>
                Start Game
              </Button>
            )}
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default GameCustomisation;
