import React from "react";
import { Modal, Button } from "react-bootstrap";

function ExpiredSession({ show, onClose }) {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>Session Expired</Modal.Header>
      <Modal.Body>
        The session has ended becasue there are not enough players in the game!
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
export default ExpiredSession;
