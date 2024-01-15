import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

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
      }
    } catch (error) {
      console.log("Failed to make request: ", error);
    }
  }

  function googleLogin() {
    window.location.href = "http://localhost:3001/auth/google";
  }

  return (
    <div>
      <h2>Login Page</h2>
      <Form>
        <Form.Group controlId="">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" size="lg" type="submit">
          Submit
        </Button>
        <Button variant="danger" size="lg" onClick={googleLogin}>
          Login With Google
        </Button>
      </Form>
    </div>
  );
}

export default LoginPage;
