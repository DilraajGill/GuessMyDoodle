import React from "react";
import { Container, Col, Row, Button, Modal } from "react-bootstrap";
import axios from "axios";
import "../../styles/HomePage.css";
import "../../styles/PictureSelector.css";

/**
 *
 * @param {string} props.currentPicture The current profile picture selected
 * @param {Array<string>} props.availablePictures List of all available profile pictures
 * @param {boolean} props.showModal Determine whether or not to display modal according to this state
 * @param {Function} props.setShowModal Modify the react state
 * @returns {React.Component} Modal component to display profile picture modifications available
 */
function PictureSelector({
  currentPicture,
  availablePictures,
  showModal,
  setShowModal,
}) {
  const [selectedPicture, setSelectedPicture] = React.useState(currentPicture);
  /**
   * Update the picture according to the selected state
   */
  async function updatePicture() {
    try {
      await axios.post("/update-picture", {
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
