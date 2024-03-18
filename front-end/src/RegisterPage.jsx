import React, { useCallback, useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import { debounce } from "lodash";
import { useNavigate } from "react-router-dom";

/**
 * React component to create the register page
 * @class RegisterPage
 */
function RegisterPage() {
  // Define states to store input about registration
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordValid, setConfirmPasswordValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [usernameAvailable, setUsernameAvailable] = useState(true);
  const [emailAvailable, setEmailAvailable] = useState(true);
  const navigation = useNavigate();
  // Submit request to the back end server
  /**
   * Submit the request to the back-end server to process form
   * @param {mouseEvent} e - Mouse event triggered when clicking submt
   */
  async function submitForm(e) {
    e.preventDefault();
    setConfirmPasswordValid(password === confirmPassword);
    if (
      usernameAvailable &&
      emailAvailable &&
      passwordValid &&
      confirmPasswordValid
    ) {
      try {
        await axios.post("/auth/register", {
          username,
          password,
          email,
        });
        navigation("/home");
      } catch (error) {
        console.log(error);
      }
    }
  }

  function googleLogin() {
    window.location.href = "http://localhost:3001/auth/google";
  }

  const checkEmailAvailability = useCallback(
    debounce(async (email) => {
      if (!email) {
        setEmailAvailable(true);
        return;
      }
      try {
        const response = await axios.get(`/auth/check-email/${email}`);
        setEmailAvailable(response.data.available);
      } catch (error) {
        console.error("Failed to check email availability", error);
      }
    }, 300),
    []
  );
  const checkUsernameAvailability = useCallback(
    debounce(async (username) => {
      if (!username) {
        setUsernameAvailable(true);
        return;
      }
      try {
        const response = await axios.get(`/auth/check-username/${username}`);
        setUsernameAvailable(response.data.available);
      } catch (error) {
        console.error("Failed to check username availability", error);
      }
    }, 300),
    []
  );

  // https://stackoverflow.com/questions/12090077/javascript-regular-expression-password-validation-having-special-characters
  function checkValidPassword(password) {
    const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return regex.test(password);
  }

  React.useEffect(() => {
    checkEmailAvailability(email);
  }, [email]);

  React.useEffect(() => {
    checkUsernameAvailability(username);
  }, [username]);

  return (
    <div>
      <Form onSubmit={submitForm}>
        <Form.Group controlId="registerEmail">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email Address"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
            isInvalid={!emailAvailable}
          />
          <Form.Control.Feedback type="invalid">
            Email is already in use!
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="registerUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            required
            isInvalid={!usernameAvailable}
          />
          <Form.Control.Feedback type="invalid">
            Username is already in use!
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="registerPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
              const valid = checkValidPassword(e.target.value);
              setPasswordValid(valid);
            }}
            required
            isInvalid={!passwordValid}
          />
        </Form.Group>
        <Form.Group controlId="registerConfirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setConfirmPasswordValid(e.target.value === password);
            }}
            required
            isInvalid={!confirmPasswordValid}
          />
          <Form.Control.Feedback type="invalid">
            Passwords do not match!
          </Form.Control.Feedback>
        </Form.Group>
        <ul className="requirements">
          <li>
            <i
              className={`${
                password.length >= 8
                  ? "bi-check-circle-fill valid"
                  : "bi-x-circle-fill invalid"
              }`}
            ></i>
            At least 8 characters long
          </li>
          <li>
            <i
              className={`${
                /[A-Z]/.test(password)
                  ? "bi-check-circle-fill valid"
                  : "bi-x-circle-fill invalid"
              }`}
            ></i>
            Contains an uppercase letter
          </li>
          <li>
            <i
              className={`${
                /[!@#$%^&*]/.test(password)
                  ? "bi-check-circle-fill valid"
                  : "bi-x-circle-fill invalid"
              }`}
            ></i>
            Contains a special character
          </li>
        </ul>

        <br />
        <Button variant="primary" size="lg" type="submit" className="me-2">
          Submit
        </Button>
        <Button variant="danger" size="lg" onClick={googleLogin}>
          Register With <i class="bi bi-google"></i>
        </Button>
      </Form>
    </div>
  );
}

export default RegisterPage;
