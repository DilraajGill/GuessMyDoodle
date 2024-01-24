import React from "react";
import { Form } from "react-bootstrap";

/**
 * Adjust the line thickness for the user when drawing
 * @param {*} thickness - React state storing the thickness of the drawing
 */
function LineThickness({ thickness, setLineThickness }) {
  // Component to adjust the line thickness of brush
  return (
    <Form>
      <Form.Group>
        <Form.Label>Line Thickness</Form.Label>
        <Form.Control
          type="range"
          value={thickness}
          onChange={(e) => setLineThickness(e.target.value)}
          min={1}
          max={10}
        />
      </Form.Group>
    </Form>
  );
}

export default LineThickness;
