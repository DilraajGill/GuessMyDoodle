import React from "react";
import { Container, Col, Row, Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./HomePage.css";
import "./PictureSelector.css";

function PictureSelector({
  currentPicture,
  availablePictures,
  showModal,
  setShowModal,
}) {
  const [selectedPicture, setSelectedPicture] = React.useState(currentPicture);
  const navigation = useNavigate();

  function updatePicture() {
    // POST to the server the new profile picture to use
  }
  return (
    <Modal show={showModal} onHide={() => setShowModal(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>Update Picture</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row>
            {availablePictures.map((pic) => (
              <Col md={3}>
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
              </Col>
            ))}
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => updatePicture()}>Submit</Button>
      </Modal.Footer>
    </Modal>

    // <div className="d-flex flex-column justify-content-center align-items-center vh-100">
    //   <Container className="text-center">
    //     <div className="home-page">
    //       <div className="top-bar align-items-center">
    //         <Row>
    //           <Col md={4}>
    //             <div className="toolbar">
    //               <Button
    //                 className="me-3"
    //                 variant="primary"
    //                 onClick={() => navigation("/store")}
    //               >
    //                 Go To Store!
    //               </Button>
    //               <Button
    //                 variant="primary"
    //                 onClick={() => navigation("/home")}
    //                 className="me-3"
    //               >
    //                 <i class="bi bi-house-fill"></i>
    //               </Button>
    //             </div>
    //           </Col>
    //           <Col md={4}>
    //             <h2>UPDATE PICTURE</h2>
    //           </Col>
    //         </Row>
    //       </div>
    //       <Row style={{ height: "600px" }}>
    //         <Col md={6} className="d-flex">
    //           <div
    //             className="d-flex flex-column align-items-center justify-content-center"
    //             style={{ width: "100%" }}
    //           >
    //             <h2>CURRENT</h2>
    //             <img
    //               src={`../${currentPicture}`}
    //               data-testId="current"
    //               className="current-picture"
    //               alt="Current Icon"
    //             />
    //           </div>
    //         </Col>
    //         <Col md={6} className="room-container mb-2">
    // {availablePictures.map((pic) => (
    //   <img
    //     src={`../${pic}`}
    //     key={pic}
    //     data-testId="available"
    //     className={`available-picture ${
    //       selectedPicture === `${pic}` ? "selected-picture" : ""
    //     }`}
    //     alt="Available Icon"
    //     onClick={() => setSelectedPicture(pic)}
    //   ></img>
    // ))}
    //         </Col>
    //       </Row>
    //     </div>
    //   </Container>
    // </div>
  );
}

export default PictureSelector;
