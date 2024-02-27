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
          <Row>
            <Col md={6}>
              <img
                src={currentPicture}
                data-testId="current"
                className="current-picture"
                alt="Current Icon"
              />
            </Col>
            <Col md={6}>
              {availablePictures.map((pic) => (
                <img
                  src={`../${pic}`}
                  key={pic}
                  data-testId="available"
                  className="available-picture"
                  alt="Available Icon"
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
