import React from "react";
import { Card } from "react-bootstrap";

/**
 * Allow the users to press the button to store the lobby URL into the clipboard
 * @param {string} props.lobbyId - ID of the lobby to be stored
 * @returns {React.Component} Component copying URL directly to clipboard
 */
function CopyToClipboard({ lobbyId }) {
  const [copied, setCopied] = React.useState(false);

  /**
   * Copy the custom URL into the clipboard
   */
  async function copy() {
    try {
      const lobby = `localhost:3000/lobby/${lobbyId}`;
      await navigator.clipboard.writeText(lobby);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.log("Failed to copy");
    }
  }
  return (
    <>
      <Card
        className={`mt-2 p-2 text-center card-clipboard ${
          copied ? "copied" : ""
        }`}
        onClick={copy}
        role="clipboard-button"
      >
        <Card.Title>
          Click to copy URL to send to your friends! Lobby ID: {lobbyId}
        </Card.Title>
        {copied && (
          <div className="clipboard-feedback">Copied To Clipboard!</div>
        )}
      </Card>
    </>
  );
}

export default CopyToClipboard;
