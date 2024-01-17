import React from "react";
import { Tabs, Tab, Container, Row, Col, Card } from "react-bootstrap";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import "./LoginAndRegister.css";
function LoginAndRegister() {
  const [state, setState] = React.useState("login");

  return (
    <Container fluid className="d-flex vh-100">
      <Row className="m-auto align-self-center">
        <Col>
          <Card>
            <Card.Header>
              <Tabs
                id="tab-state"
                activeKey={state}
                onSelect={(e) => setState(e)}
                className="nav-pills justify-content-center"
              >
                <Tab eventKey="login" title="Login"></Tab>
                <Tab eventKey="register" title="Register"></Tab>
              </Tabs>
            </Card.Header>
            <Card.Body>
              {state === "login" ? <LoginPage /> : <RegisterPage />}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginAndRegister;
