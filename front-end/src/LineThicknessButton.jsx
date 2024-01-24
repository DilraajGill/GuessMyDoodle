import React from "react";
import { OverlayTrigger, Popover, Button } from "react-bootstrap";
import LineThickness from "./LineThickness";

function LineThicknessButton({ thickness, setLineThickness }) {
  const linePopover = (
    <Popover>
      <Popover.Body>
        <LineThickness
          thickness={thickness}
          setLineThickness={setLineThickness}
        />
      </Popover.Body>
    </Popover>
  );
  return (
    <div>
      <OverlayTrigger
        trigger="click"
        placement="bottom"
        rootClose
        overlay={linePopover}
      >
        <Button>Thickness</Button>
      </OverlayTrigger>
    </div>
  );
}

export default LineThicknessButton;
