import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
/**
 * Login Page to allow the user to authenticate themselves
 * @returns {React.Component} Component for the user to sign in
 */
function LoginPage() {
  // Define navigate object and React states to store information
  const navigation = useNavigate();
  /**
   * Define React states to store values of username and password
   */
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
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
        // If correct information, navigate to the home page
        navigation("/home");
      } else {
      }
    } catch (error) {
      setError("Invalid username or password");
    }
  }

  function googleLogin() {
    window.location.href = "http://localhost:3001/auth/google";
  }

  return (
    <div>
      <Form onSubmit={submitForm}>
        <Form.Group controlId="loginEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            isInvalid={!!error}
          />
        </Form.Group>
        <Form.Group controlId="loginPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
            required
            isInvalid={!!error}
          />
          <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
        </Form.Group>
        <br />
        <Button variant="primary" size="lg" type="submit" className="me-2">
          Submit
        </Button>
        <Button variant="danger" size="lg" onClick={googleLogin}>
          Login With <i class="bi bi-google"></i>
        </Button>
      </Form>
    </div>
  );
}

export default LoginPage;
