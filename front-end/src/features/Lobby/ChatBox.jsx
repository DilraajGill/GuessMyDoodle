import React, { useState, useEffect } from "react";
import { Container, Row, Col, InputGroup, Form, Button } from "react-bootstrap";
import "../../styles/ChatBox.css";
// Function to receive message and update state
/**
 * Function to handle receiving a message and updating state
 * @param {object} data - Message received
 * @param {function} setMessages - Function to be executed to update state
 */
export function receiveMessage(data, setMessages) {
  console.log("Received message");
  setMessages((prevMessages) => [data, ...prevMessages]);
}

/**
 * Display chatbox component
 * @class ChatBox
 * @param {object} socket - Socket to emit from for communication
 * @param {string} username - Username of player signed in
 * @param {string} lobbyId - lobbyId to emit the message into
 */
function ChatBox({ socket, username, lobbyId }) {
  // Define states for storing the current user's message and the history of messages
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  // If the user receives a message, call the function receiveMessage
  useEffect(() => {
    socket.on("receive-message", (data) => {
      receiveMessage(data, setMessages);
    });
  }, [socket]);
  // Upon submitting a message, it will be emitted to the back end
  /**
   * Handle sending message
   * @function handleSend
   * @memberof ChatBox
   */
  function handleSend() {
    if (newMessage.trim() !== "") {
      socket.emit("send-message", {
        username,
        text: newMessage.trim(),
        lobbyId,
      });
      setNewMessage("");
    }
  }

  return (
    <Container>
      <Row>
        <Col>
          <div className="chatbox-container">
            <InputGroup>
              <Form.Control
                placeholder="Input message / guess here!"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSend();
                  }
                }}
              ></Form.Control>
              <Button variant="primary" onClick={handleSend}>
                Send
              </Button>
            </InputGroup>
            {messages.map((message, index) => (
              <div key={index} className="chatbox-message">
                <strong>{message.username}: </strong>
                {message.text}
              </div>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ChatBox;
