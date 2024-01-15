import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Button, Modal } from "react-bootstrap";
import "./LoginPage.css";

/**
 * Login Page to allow the user to authenticate themselves
 * @class LoginPage
 */
function LoginPage() {
  // Define navigate object and React states to store information
  const navigate = useNavigate();
  /**
   * Define React states to store values of username and password
   */
  const [signedIn, setSignedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  // Submit the form to the back end server to sign in
  /**
   * Submit the form containing username and password of the user account
   * @param {mouseEvent} e - Mouse event to trigger submission of the form
   */
  async function submitForm(e) {
    e.preventDefault();
    var items = {
      username,
      password,
    };
    try {
      const response = await axios.post("/auth/login", items);
      if (response.data.auth) {
        setSignedIn(true);
        console.log("valid");
        // If correct information, navigate to the home page
        navigate("/home");
      } else {
        setModalMessage("Invalid username or password");
        setShowModal(true);
      }
    } catch (error) {
      setModalMessage(`Failed to make request: ${error}`);
      setShowModal(true);
    }
  }

  function googleLogin() {
    window.location.href = "http://localhost:3001/auth/google";
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="login-form-container">
        <Form onSubmit={submitForm}>
          <Form.Group controlId="loginEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="loginPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <br />
          <Button variant="primary" size="lg" type="submit" className="me-2">
            Submit
          </Button>
          <Button variant="danger" size="lg" onClick={googleLogin}>
            Login With Google
          </Button>
        </Form>
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Failed To Authenticate User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>{modalMessage}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => setShowModal(false)}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default LoginPage;
