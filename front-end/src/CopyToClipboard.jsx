import React from "react";
import { Card, Toast } from "react-bootstrap";

function CopyToClipboard({ lobbyId }) {
  const [showMessage, setShowMessage] = React.useState(false);

  async function copy() {
    try {
      const lobby = `localhost:3000/lobby/${lobbyId}`;
      await navigator.clipboard.writeText(lobby);
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 4000);
    } catch (err) {
      console.log("Failed to copy");
    }
  }
  return (
    <>
      <Card className="mt-2 p-2 text-center" onClick={copy}>
        <Card.Title>
          Click to copy URL to send to your friends! Lobby ID: {lobbyId}
        </Card.Title>
      </Card>
      <Toast
        show={showMessage}
        onClose={() => setShowMessage(false)}
        delay={4000}
        autohide
      >
        <Toast.Header>
          <strong>Success!</strong>
        </Toast.Header>
        <Toast.Body>Link has been copied to clipboard!</Toast.Body>
      </Toast>
    </>
  );
}

export default CopyToClipboard;
