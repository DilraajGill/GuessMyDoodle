import React from "react";
import { Modal, Button } from "react-bootstrap";

/**
 * Component if the user has been kicked from their session
 * @param {boolean} props.show - Flag to determine if the modal should appear
 * @param {Function} props.onClose - Function to be executed when user closes the modal
 * @returns {React.Component} Kicked modal rendered (if flag is true)
 */
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
