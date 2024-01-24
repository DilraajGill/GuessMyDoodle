import React from "react";
import { OverlayTrigger, Popover, Button } from "react-bootstrap";
import ColourChooser from "./ColourChooser";
function ColourChooserButton({ setSelectedColour }) {
  const colourPopover = (
    <Popover>
      <Popover.Body>
        <ColourChooser toCanvas={setSelectedColour} />
      </Popover.Body>
    </Popover>
  );
  return (
    <div>
      <OverlayTrigger
        trigger="click"
        placement="bottom"
        rootClose
        overlay={colourPopover}
      >
        <Button>
          <i class="bi bi-eyedropper"></i>
        </Button>
      </OverlayTrigger>
    </div>
  );
}

export default ColourChooserButton;
