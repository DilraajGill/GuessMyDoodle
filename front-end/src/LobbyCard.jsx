import React from "react";
function LobbyCard({ lobby, onClick }) {
  return (
    <div onClick={onClick}>
      <h3>Lobby ID: {lobby.id}</h3>
      <h4>Player Count: {lobby.playerCount}</h4>
    </div>
  );
}

export default LobbyCard;
