import React from "react";
import { Tabs, Tab, Container, Row, Col, Card } from "react-bootstrap";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";

function LoginAndRegister() {
  const [state, setState] = React.useState("login");

  return (
    <Container>
      <Row>
        <Col>
          <Card>
            <Tabs
              id="tab-state"
              activeKey={state}
              onSelect={(e) => setState(e)}
              className="nav-pills nav-justified"
            >
              <Tab eventKey="login" title="Login">
                <LoginPage />
              </Tab>
              <Tab eventKey="register" title="Register">
                <RegisterPage />
              </Tab>
            </Tabs>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginAndRegister;
