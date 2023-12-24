import React from "react";
function PlayerCard({ player, points, colour }) {
  return (
    <div>
      <h4>{player}</h4>
      <h6>{points}</h6>
    </div>
  );
}
export default PlayerCard;
