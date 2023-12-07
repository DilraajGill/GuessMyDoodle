import React from "react";
/**
 * Allow for customisation of gameplay settings
 * @class GameCustomisation
 * @param {object} socket
 * @param {number} rounds
 * @param {number} minutes
 */
function GameCustomisation({ socket, rounds, minutes }) {
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
        Number of Rounds
        <input
          type="range"
          min="1"
          max="6"
          value={rounds}
          onChange={roundUpdate}
        />
      </label>
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
      <button onClick={startGame}>Start Game</button>
    </div>
  );
}

export default GameCustomisation;
