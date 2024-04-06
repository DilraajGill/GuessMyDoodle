import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function KickedModal({ show, onClose }) {
  const navigate = useNavigate();

  function handleClose() {
    onClose();
    navigate("/", {
      replace: true,
      state: { kicked: false },
    });
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Kicked From Lobby!</Modal.Title>
      </Modal.Header>
      <Modal.Body>You have been kicked from the lobby!</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default KickedModal;
