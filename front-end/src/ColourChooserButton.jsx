import React from "react";
import { OverlayTrigger, Popover, Button } from "react-bootstrap";
import ColourChooser from "./ColourChooser";
function ColourChooserButton() {
  const colourPopover = (
    <Popover>
      <Popover.Body>
        <ColourChooser />
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
        <Button>Colour</Button>
      </OverlayTrigger>
    </div>
  );
}

export default ColourChooserButton;
