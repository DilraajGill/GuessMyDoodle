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
