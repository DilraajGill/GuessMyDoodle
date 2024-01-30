import React from "react";
import { Card } from "react-bootstrap";

function CopyToClipboard({ lobbyId }) {
  async function copy() {
    try {
      const lobby = `localhost:3000/lobby/${lobbyId}`;
      await navigator.clipboard.writeText(lobby);
    } catch (err) {
      console.log("Failed to copy");
    }
  }
  return (
    <Card className="mt-2 text-center" onClick={copy}>
      <Card.Title>
        Click to copy URL to send to your friends! Lobby ID: {lobbyId}
      </Card.Title>
    </Card>
  );
}

export default CopyToClipboard;
