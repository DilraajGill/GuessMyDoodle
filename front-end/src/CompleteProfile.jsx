import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import "./LoginAndRegister.css";

function CompleteProfile() {
  const [username, setUsername] = React.useState("");
  const navigation = useNavigate();
  const [usernameError, setUsernameError] = React.useState("");

  async function submitUsername(ev) {
    ev.preventDefault();
    try {
      const response = await axios.post("auth/complete-profile", {
        username,
      });
      if (response.data.success) {
        navigation("/home");
      }
    } catch (error) {
      setUsernameError("This username already exists");
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
                      setUsernameError("");
                    }}
                    required
                    isInvalid={!!usernameError}
                  />
                  <Form.Control.Feedback type="invalid">
                    {usernameError}
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
