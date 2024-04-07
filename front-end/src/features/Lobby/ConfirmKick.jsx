import React from "react";
import { Modal, Button } from "react-bootstrap";

function ConfirmKick({ show, onHide, kickUser, selectedUser }) {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header>Kick Player!</Modal.Header>
      <Modal.Body>Are you sure you want to kick {selectedUser}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="danger" onClick={() => kickUser(selectedUser)}>
          Kick
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmKick;
