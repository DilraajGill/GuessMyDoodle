import React from "react";
import { Modal, Button } from "react-bootstrap";

function KickedModal({ show, onClose }) {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Kicked From Lobby!</Modal.Title>
      </Modal.Header>
      <Modal.Body>You have been kicked from the lobby!</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default KickedModal;
