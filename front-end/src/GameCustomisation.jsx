import React from "react";
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
    socket.emit("update-privacy", ev.target.value);
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
      <label>
        Private Lobby
        <input
          type="radio"
          value="private"
          checked={lobbyType === "private"}
          onChange={privacyUpdate}
        />
      </label>
      <label>
        Public Lobby
        <input
          type="radio"
          value="public"
          checked={lobbyType === "public"}
          onChange={privacyUpdate}
        />
      </label>
      <br />
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
        />
      </label>
      <button onClick={startGame}>Start Game</button>
    </div>
  );
}

export default GameCustomisation;
