import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Modal } from "react-bootstrap";
/**
 * React component to create the register page
 * @class RegisterPage
 */
function RegisterPage() {
  // Define states to store input about registration
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  // Submit request to the back end server
  /**
   * Submit the request to the back-end server to process form
   * @param {mouseEvent} e - Mouse event triggered when clicking submt
   */
  async function submitForm(e) {
    e.preventDefault();
    var items = {
      username,
      password,
      email,
    };
    console.log(items);
    try {
      axios.post("/auth/register", items);
    } catch (error) {
      setModalMessage(error);
      setShowModal(true);
    }
  }

  function googleLogin() {
    window.location.href = "http://localhost:3001/auth/google";
  }

  return (
    <div>
      <Form onSubmit={submitForm}>
        <Form.Group controlId="registerEmail">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email Address"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="registerUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="registerPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <br />
        <Button variant="primary" size="lg" type="submit" className="me-2">
          Submit
        </Button>
        <Button variant="danger" size="lg" onClick={googleLogin}>
          Register With Google
        </Button>
      </Form>
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Failed To Create Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{modalMessage}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default RegisterPage;
