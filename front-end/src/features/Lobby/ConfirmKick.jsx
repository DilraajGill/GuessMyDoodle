import React from "react";
import { Modal, Button } from "react-bootstrap";

/**
 * Modal to confirm if the user is to be kicked
 * @param {boolean} props.show - Flag to determine if modal should be visible
 * @param {Function} props.onHide - Function to minimise the modal
 * @param {Function} props.kickUser - Function to be executed in order to kick the user
 * @param {string} props.selectedUser - Username of the user being kicked
 * @returns {React.Component} Confirm Kick modal is rendered (if flag is true)
 */
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
