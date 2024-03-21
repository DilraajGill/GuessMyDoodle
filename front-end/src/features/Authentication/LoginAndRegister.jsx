import React, { useEffect } from "react";
import { Tabs, Tab, Container, Row, Col, Card } from "react-bootstrap";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import { authContext } from "../../App";
import "../../styles/LoginAndRegister.css";
import checkAuthentication from "../../components/CheckAuthentication";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function LoginAndRegister({ defaultState }) {
  const navigation = useNavigate();
  const [state, setState] = React.useState(defaultState);
  const [signedIn, setSignedIn] = React.useContext(authContext);

  useEffect(() => {
    async function ensureLogin() {
      const response = await checkAuthentication({ axios });
      if (response.auth) {
        if (!response.username) {
          navigation("/complete-profile");
        }
        setSignedIn({
          auth: true,
          username: response.username,
          points: response.points,
          tools: response.tools,
          profilePicture: response.profilePicture,
          purchasedProfilePicture: response.purchasedProfilePicture,
        });
        navigation("/home");
      }
    }
    ensureLogin();
  });

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
              {state === "login" ? <LoginPage axios /> : <RegisterPage axios />}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginAndRegister;
