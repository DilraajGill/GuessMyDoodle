import React from "react";

function GameCustomisation() {
  const [minutes, setMinutes] = React.useState(1);
  const [rounds, setRounds] = React.useState(1);
  return (
    <div>
      <label>
        Number of Rounds
        <input type="range" min="1" max="6" />
      </label>
      <label>
        Number of Minutes
        <input type="range" min="1" max="3" />
      </label>
    </div>
  );
}
