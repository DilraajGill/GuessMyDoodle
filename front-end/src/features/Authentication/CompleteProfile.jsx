import React, { useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import "../../styles/LoginAndRegister.css";
import { debounce } from "lodash";

/**
 * Component for completing the user profile if signing in with Google OAuth 2.0
 * @returns {React.Component} - CompleteProfile Component
 */
function CompleteProfile() {
  const [username, setUsername] = React.useState("");
  const navigation = useNavigate();
  const [usernameAvailable, setUsernameAvailable] = React.useState(true);

  // Function to check if the username is available
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

  // Check if the username is available when "username" state changes
  React.useEffect(() => {
    checkUsernameAvailability(username);
  }, [username]);

  /**
   * Submit username to the back-end server
   * @param {React.FormEvent} ev - Event passed as parameter after submitting form
   */
  async function submitUsername(ev) {
    ev.preventDefault();
    if (usernameAvailable) {
      try {
        const response = await axios.post("auth/complete-profile", {
          username,
        });
        if (response.data.success) {
          // If valid username, direct user to the home page
          navigation("/home");
        }
      } catch (error) {
        console.error(error);
      }
    }
  }
  return (
    <Container fluid className="d-flex vh-100">
      <Row className="m-auto align-self-center">
        <Col>
          <Card>
            <Card.Body>
              <div>
                <Form onSubmit={submitUsername}>
                  <Form.Group controlId="loginUsername"></Form.Group>
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                    required
                    isInvalid={!usernameAvailable}
                  />
                  <Form.Control.Feedback type="invalid">
                    Username has been taken!
                  </Form.Control.Feedback>
                  <br />
                  <Button
                    variant="primary"
                    size="lg"
                    type="submit"
                    className="me-2"
                  >
                    Submit
                  </Button>
                </Form>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default CompleteProfile;
