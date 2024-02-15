import React, { useEffect } from "react";
import axios from "axios";
import checkAuthentication from "./checkAuthentication";
import { authContext } from "./App";
import { useNavigate } from "react-router-dom";
import { Container, Button, Row, Col } from "react-bootstrap";
import "./HomePage.css";
import StoreCard from "./StoreCard";
import { PaintBucket } from "react-bootstrap-icons";
import "./Store.css";

function Store() {
  const [signedIn, setSignedIn] = React.useContext(authContext);
  const navigation = useNavigate();
  useEffect(() => {
    async function ensureLogin() {
      const response = await checkAuthentication({ axios });
      if (response.auth) {
        setSignedIn({
          auth: true,
          username: response.username,
          points: response.points,
          tools: response.tools,
        });
      } else {
        // If not signed in, navigate them to the /login page
        navigation("/login");
      }
    }
    ensureLogin();
  }, []);
  async function purchaseFillTool() {
    try {
      const response = await axios.post("/store/buy/fill-tool");
    } catch (error) {
      console.log("Error purchasing fill tool");
    }
  }
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Container className="text-center home-page">
        <div className="top-bar align-items-center">
          <Row>
            <Col md={4}>
              <div className="toolbar">
                <Button
                  className="me-3"
                  variant="primary"
                  onClick={() => navigation("/home")}
                >
                  Go To Home!
                </Button>
              </div>
            </Col>
            <Col md={4}>
              <h2>Store</h2>
            </Col>
            <Col md={4}>
              <div className="points-container text-right mr-3">
                <div className="points-label">Points</div>
                <div className="points-value">
                  <strong>{signedIn.points}</strong>
                </div>
              </div>
            </Col>
          </Row>
        </div>

        <div className="room-container my-3 p-3">
          <Row xs={1} md={3} lg={4}>
            <Col>
              <StoreCard
                Icon={PaintBucket}
                name="Fill Tool"
                buttonText={
                  signedIn.tools?.includes("fill")
                    ? "Already Own"
                    : "Buy Fill Tool"
                }
                onPurchaseClick={purchaseFillTool}
                isOwned={signedIn.tools?.includes("fill")}
              />
            </Col>
            <Col>
              <StoreCard
                imageURL={"../2.jpg"}
                name="Toy Gun Icon"
                buttonText={
                  signedIn.tools?.includes("fill")
                    ? "Already Own"
                    : "Buy Fill Tool"
                }
                onPurchaseClick={purchaseFillTool}
                isOwned={signedIn.tools?.includes("fill")}
              />
            </Col>
            <Col>
              <StoreCard
                imageURL={"../3.jpg"}
                name="Ticking Spike Icon"
                buttonText={
                  signedIn.tools?.includes("fill")
                    ? "Already Own"
                    : "Buy Fill Tool"
                }
                onPurchaseClick={purchaseFillTool}
                isOwned={signedIn.tools?.includes("fill")}
              />
            </Col>
            <Col>
              <StoreCard
                imageURL={"../4.jpg"}
                name="Explosion Icon"
                buttonText={
                  signedIn.tools?.includes("fill")
                    ? "Already Own"
                    : "Buy Fill Tool"
                }
                onPurchaseClick={purchaseFillTool}
                isOwned={signedIn.tools?.includes("fill")}
              />
            </Col>
            <Col>
              <StoreCard
                imageURL={"../5.jpg"}
                name="Mee6 Icon"
                buttonText={
                  signedIn.tools?.includes("fill")
                    ? "Already Own"
                    : "Buy Fill Tool"
                }
                onPurchaseClick={purchaseFillTool}
                isOwned={signedIn.tools?.includes("fill")}
              />
            </Col>
            <Col>
              <StoreCard
                imageURL={"../6.jpg"}
                name="Thunderbolt Icon"
                buttonText={
                  signedIn.tools?.includes("fill")
                    ? "Already Own"
                    : "Buy Fill Tool"
                }
                onPurchaseClick={purchaseFillTool}
                isOwned={signedIn.tools?.includes("fill")}
              />
            </Col>
            <Col>
              <StoreCard
                imageURL={"../7.jpg"}
                name="Thumbs Down Icon"
                buttonText={
                  signedIn.tools?.includes("fill")
                    ? "Already Own"
                    : "Buy Fill Tool"
                }
                onPurchaseClick={purchaseFillTool}
                isOwned={signedIn.tools?.includes("fill")}
              />
            </Col>
            <Col>
              <StoreCard
                imageURL={"../8.jpg"}
                name="Flying Plane Icon"
                buttonText={
                  signedIn.tools?.includes("fill")
                    ? "Already Own"
                    : "Buy Fill Tool"
                }
                onPurchaseClick={purchaseFillTool}
                isOwned={signedIn.tools?.includes("fill")}
              />
            </Col>
            <Col>
              <StoreCard
                imageURL={"../9.jpg"}
                name="Star Icon"
                buttonText={
                  signedIn.tools?.includes("fill")
                    ? "Already Own"
                    : "Buy Fill Tool"
                }
                onPurchaseClick={purchaseFillTool}
                isOwned={signedIn.tools?.includes("fill")}
              />
            </Col>
            <Col>
              <StoreCard
                imageURL={"../10.jpg"}
                name="Heart Icon"
                buttonText={
                  signedIn.tools?.includes("fill")
                    ? "Already Own"
                    : "Buy Fill Tool"
                }
                onPurchaseClick={purchaseFillTool}
                isOwned={signedIn.tools?.includes("fill")}
              />
            </Col>
            <Col>
              <StoreCard
                imageURL={"../11.jpg"}
                name="Toy Gun Icon"
                buttonText={
                  signedIn.tools?.includes("fill")
                    ? "Already Own"
                    : "Buy Fill Tool"
                }
                onPurchaseClick={purchaseFillTool}
                isOwned={signedIn.tools?.includes("fill")}
              />
            </Col>
            <Col>
              <StoreCard
                imageURL={"../12.jpg"}
                name="Toy Gun Icon"
                buttonText={
                  signedIn.tools?.includes("fill")
                    ? "Already Own"
                    : "Buy Fill Tool"
                }
                onPurchaseClick={purchaseFillTool}
                isOwned={signedIn.tools?.includes("fill")}
              />
            </Col>
            <Col>
              <StoreCard
                imageURL={"../13.jpg"}
                name="Skull&Bones Icon"
                buttonText={
                  signedIn.tools?.includes("fill")
                    ? "Already Own"
                    : "Buy Fill Tool"
                }
                onPurchaseClick={purchaseFillTool}
                isOwned={signedIn.tools?.includes("fill")}
              />
            </Col>
            <Col>
              <StoreCard
                imageURL={"../14.jpg"}
                name="BANG! Icon"
                buttonText={
                  signedIn.tools?.includes("fill")
                    ? "Already Own"
                    : "Buy Fill Tool"
                }
                onPurchaseClick={purchaseFillTool}
                isOwned={signedIn.tools?.includes("fill")}
              />
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
}

export default Store;
