import React from "react";
import { Container, Col, Row, Button, Modal } from "react-bootstrap";
import axios from "axios";
import "../../styles/HomePage.css";
import "../../styles/PictureSelector.css";

function PictureSelector({
  currentPicture,
  availablePictures,
  showModal,
  setShowModal,
}) {
  const [selectedPicture, setSelectedPicture] = React.useState(currentPicture);

  async function updatePicture() {
    // POST to the server the new profile picture to use
    try {
      const response = await axios.post("/update-picture", {
        picture: selectedPicture,
      });
      setShowModal(false);
      window.location.reload();
    } catch (error) {
      console.log("Unable to update picture");
    }
  }
  return (
    <Modal show={showModal} onHide={() => setShowModal(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>Update Picture</Modal.Title>
      </Modal.Header>
      <Modal.Body className="picture-body">
        <Container>
          <Row>
            {availablePictures &&
              availablePictures.map((pic) => (
                <Col md={3}>
                  <img
                    src={`../${pic}`}
                    key={pic}
                    data-testId={
                      selectedPicture === `${pic}` ? "selected" : "available"
                    }
                    className={`available-picture ${
                      selectedPicture === `${pic}` ? "selected-picture" : ""
                    }`}
                    alt="Available Icon"
                    onClick={() => setSelectedPicture(pic)}
                  ></img>
                </Col>
              ))}
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => updatePicture()}>Submit</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default PictureSelector;
