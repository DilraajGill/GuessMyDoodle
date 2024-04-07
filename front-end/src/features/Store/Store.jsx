import React from "react";
import axios from "axios";
import { authContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { Container, Button, Row, Col, Modal, Dropdown } from "react-bootstrap";
import "../../styles/HomePage.css";
import StoreCard from "./StoreCard";
import { PaintBucket } from "react-bootstrap-icons";
import PictureSelector from "../Home Page/PictureSelector";
import "../../styles/Store.css";
/**
 *
 * @returns {React.Component} Display the store page
 */
function Store() {
  const [signedIn, setSignedIn] = React.useContext(authContext);
  const navigation = useNavigate();
  const [moneyModal, setMoneyModal] = React.useState(false);
  const [changePicture, setChangePicture] = React.useState(false);
  /**
   * Function to purchase fill tool
   */
  async function purchaseFillTool() {
    try {
      await axios.post("/store/buy/fill-tool");
      navigation(0);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Display modal if lacking money to purchase item
        setMoneyModal(true);
      }
    }
  }

  /**
   * Function to purchase profile picture
   * @param {string} id - ID of profile picture to purchase
   */
  async function purchasedProfilePicture(id) {
    try {
      await axios.post(`/store/buy/${id}`);
      navigation(0);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Display modal if lacking money to purchase item
        setMoneyModal(true);
      }
    }
  }

  /**
   * Function to sing out of the web page
   */
  async function signOut() {
    try {
      const status = await axios.get("/auth/sign-out");
      if (!status.data.auth) {
        setSignedIn({
          auth: false,
        });
        navigation("/login");
      }
    } catch (error) {
      console.log("Unable to sign out");
    }
  }

  return (
    <Container
      fluid
      className="min-vh-100 d-flex align-items-center justify-content-center"
    >
      <Col md={1} />
      <Col md={10}>
        <Col md={12} className="profile">
          <Dropdown>
            <Dropdown.Toggle variant="link">
              <img
                className="profile-picture"
                src={signedIn.profilePicture}
                alt={`${signedIn.username}'s Profile'`}
              />
              <span className="ms-2 profile-username">{signedIn.username}</span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setChangePicture(true)}>
                Change Icon
              </Dropdown.Item>
              <Dropdown.Item onClick={() => signOut()}>Sign Out</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col md={12} className="home-page">
          <Row className="top-bar align-items-center text-center">
            <Col md={4}>
              <div className="toolbar">
                <Button
                  className="me-3"
                  variant="primary"
                  onClick={() => navigation("/home")}
                >
                  <i className="bi bi-house-fill"></i>
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
          <Col md={12}>
            <Row
              className="room-container mt-2"
              xs={1}
              sm={2}
              md={2}
              lg={3}
              xl={3}
              xxl={4}
            >
              {/* Display store card for each item in the store */}
              <Col>
                <StoreCard
                  Icon={PaintBucket}
                  name="Fill Tool"
                  buttonText={
                    signedIn.tools?.includes("fill")
                      ? "Already Own"
                      : "10,000 Points"
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
                    signedIn.purchasedProfilePicture?.includes("2.jpg")
                      ? "Already Own"
                      : "5,000 Points"
                  }
                  onPurchaseClick={() => purchasedProfilePicture(2)}
                  isOwned={signedIn.purchasedProfilePicture?.includes("2.jpg")}
                />
              </Col>
              <Col>
                <StoreCard
                  imageURL={"../3.jpg"}
                  name="Ticking Spike Icon"
                  buttonText={
                    signedIn.purchasedProfilePicture?.includes("3.jpg")
                      ? "Already Own"
                      : "5,000 Points"
                  }
                  onPurchaseClick={() => purchasedProfilePicture(3)}
                  isOwned={signedIn.purchasedProfilePicture?.includes("3.jpg")}
                />
              </Col>
              <Col>
                <StoreCard
                  imageURL={"../4.jpg"}
                  name="Explosion Icon"
                  buttonText={
                    signedIn.purchasedProfilePicture?.includes("4.jpg")
                      ? "Already Own"
                      : "5,000 Points"
                  }
                  onPurchaseClick={() => purchasedProfilePicture(4)}
                  isOwned={signedIn.purchasedProfilePicture?.includes("4.jpg")}
                />
              </Col>
              <Col>
                <StoreCard
                  imageURL={"../5.jpg"}
                  name="Mee6 Icon"
                  buttonText={
                    signedIn.purchasedProfilePicture?.includes("5.jpg")
                      ? "Already Own"
                      : "5,000 Points"
                  }
                  onPurchaseClick={() => purchasedProfilePicture(5)}
                  isOwned={signedIn.purchasedProfilePicture?.includes("5.jpg")}
                />
              </Col>
              <Col>
                <StoreCard
                  imageURL={"../6.jpg"}
                  name="Thunderbolt Icon"
                  buttonText={
                    signedIn.purchasedProfilePicture?.includes("6.jpg")
                      ? "Already Own"
                      : "5,000 Points"
                  }
                  onPurchaseClick={() => purchasedProfilePicture(6)}
                  isOwned={signedIn.purchasedProfilePicture?.includes("6.jpg")}
                />
              </Col>
              <Col>
                <StoreCard
                  imageURL={"../7.jpg"}
                  name="Thumbs Down Icon"
                  buttonText={
                    signedIn.purchasedProfilePicture?.includes("7.jpg")
                      ? "Already Own"
                      : "5,000 Points"
                  }
                  onPurchaseClick={() => purchasedProfilePicture(7)}
                  isOwned={signedIn.purchasedProfilePicture?.includes("7.jpg")}
                />
              </Col>
              <Col>
                <StoreCard
                  imageURL={"../8.jpg"}
                  name="Flying Plane Icon"
                  buttonText={
                    signedIn.purchasedProfilePicture?.includes("8.jpg")
                      ? "Already Own"
                      : "5,000 Points"
                  }
                  onPurchaseClick={() => purchasedProfilePicture(8)}
                  isOwned={signedIn.purchasedProfilePicture?.includes("8.jpg")}
                />
              </Col>
              <Col>
                <StoreCard
                  imageURL={"../9.jpg"}
                  name="Star Icon"
                  buttonText={
                    signedIn.purchasedProfilePicture?.includes("9.jpg")
                      ? "Already Own"
                      : "5,000 Points"
                  }
                  onPurchaseClick={() => purchasedProfilePicture(9)}
                  isOwned={signedIn.purchasedProfilePicture?.includes("9.jpg")}
                />
              </Col>
              <Col>
                <StoreCard
                  imageURL={"../10.jpg"}
                  name="Heart Icon"
                  buttonText={
                    signedIn.purchasedProfilePicture?.includes("10.jpg")
                      ? "Already Own"
                      : "5,000 Points"
                  }
                  onPurchaseClick={() => purchasedProfilePicture(10)}
                  isOwned={signedIn.purchasedProfilePicture?.includes("10.jpg")}
                />
              </Col>
              <Col>
                <StoreCard
                  imageURL={"../11.jpg"}
                  name="Toy Gun Icon"
                  buttonText={
                    signedIn.purchasedProfilePicture?.includes("11.jpg")
                      ? "Already Own"
                      : "5,000 Points"
                  }
                  onPurchaseClick={() => purchasedProfilePicture(11)}
                  isOwned={signedIn.purchasedProfilePicture?.includes("11.jpg")}
                />
              </Col>
              <Col>
                <StoreCard
                  imageURL={"../12.jpg"}
                  name="Toy Gun Icon"
                  buttonText={
                    signedIn.purchasedProfilePicture?.includes("12.jpg")
                      ? "Already Own"
                      : "5,000 Points"
                  }
                  onPurchaseClick={() => purchasedProfilePicture(12)}
                  isOwned={signedIn.purchasedProfilePicture?.includes("12.jpg")}
                />
              </Col>
              <Col>
                <StoreCard
                  imageURL={"../13.jpg"}
                  name="Skull&Bones Icon"
                  buttonText={
                    signedIn.purchasedProfilePicture?.includes("13.jpg")
                      ? "Already Own"
                      : "5,000 Points"
                  }
                  onPurchaseClick={() => purchasedProfilePicture(13)}
                  isOwned={signedIn.purchasedProfilePicture?.includes("13.jpg")}
                />
              </Col>
              <Col>
                <StoreCard
                  imageURL={"../14.jpg"}
                  name="BANG! Icon"
                  buttonText={
                    signedIn.purchasedProfilePicture?.includes("14.jpg")
                      ? "Already Own"
                      : "5,000 Points"
                  }
                  onPurchaseClick={() => purchasedProfilePicture(14)}
                  isOwned={signedIn.purchasedProfilePicture?.includes("14.jpg")}
                />
              </Col>
            </Row>
          </Col>
        </Col>
      </Col>
      <Col md={1} />
      <PictureSelector
        showModal={changePicture}
        setShowModal={setChangePicture}
        currentPicture={signedIn.profilePicture}
        availablePictures={signedIn.purchasedProfilePicture}
      />
      <Modal show={moneyModal} onHide={() => setMoneyModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Unable to purchase item!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          You do not have enough money to purchase this item!
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setMoneyModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Store;
