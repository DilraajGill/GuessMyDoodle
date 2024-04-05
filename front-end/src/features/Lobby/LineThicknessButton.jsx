import React from "react";
import { OverlayTrigger, Popover, Button } from "react-bootstrap";
import LineThickness from "./LineThickness";
/**
 * Button to display the line thickness component when clicked
 * @param {number} props.thickness - React state of the user's selected thickness
 * @param {Function} props.setLineThickness - Function to modify and update line thickness
 */
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
  // Calcualte size of image according to selection
  const size = thickness ? `${thickness * 2}px` : "4px";
  return (
    <>
      <OverlayTrigger
        trigger="click"
        placement="top"
        rootClose
        overlay={linePopover}
      >
        <Button className="line-thickness-button">
          <span
            class="bi bi-circle-fill"
            style={{ fontSize: size, verticalAlign: "middle" }}
          ></span>
        </Button>
      </OverlayTrigger>
    </>
  );
}

export default LineThicknessButton;
