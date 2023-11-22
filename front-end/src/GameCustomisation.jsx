import React from "react";

function GameCustomisation({ socket, rounds, minutes }) {
  function roundUpdate(ev) {
    socket.emit("update-rounds", ev.target.value);
  }

  function minutesUpdate(ev) {
    socket.emit("update-minutes", ev.target.value);
  }

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
