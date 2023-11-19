import React from "react";
import { useParams } from "react-router-dom";

function Lobby() {
  const { lobbyId } = useParams();

  return (
    <div>
      <h1>Lobby ID: {lobbyId}</h1>
    </div>
  );
}

export default Lobby;
