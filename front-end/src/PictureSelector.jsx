import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import axios from "axios";
import "./HomePage.css";
import "./PictureSelector.css";

function PictureSelector({ currentPicture, availablePictures }) {
  const [selectedPicture, setSelectedPicture] = React.useState(null);

  function updatePicture() {
    // POST to the server the new profile picture to use
  }
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
      <Container className="text-center">
        <div className="home-page">
          <Row style={{ height: "600px" }}>
            <Col md={6} className="d-flex">
              <div
                className="d-flex flex-column align-items-center justify-content-center"
                style={{ width: "100%" }}
              >
                <h2>CURRENT</h2>
                <img
                  src={currentPicture}
                  data-testId="current"
                  className="current-picture"
                  alt="Current Icon"
                />
              </div>
            </Col>
            <Col md={6}>
              {availablePictures.map((pic) => (
                <img
                  src={`../${pic}`}
                  key={pic}
                  data-testId="available"
                  className={`available-picture ${
                    selectedPicture === `${pic}` ? "selected-picture" : ""
                  }`}
                  alt="Available Icon"
                  onClick={() => setSelectedPicture(pic)}
                ></img>
              ))}
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
}

export default PictureSelector;
