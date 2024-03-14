import React from "react";
import { Form } from "react-bootstrap";

/**
 * Adjust the line thickness for the user when drawing
 * @param {*} thickness - React state storing the thickness of the drawing
 */
function LineThickness({ thickness, setLineThickness }) {
  const options = [2, 4, 6, 8, 10];
  // Component to adjust the line thickness of brush
  return (
    <div className="line-thickness-options">
      {options.map((option) => (
        <div
          key={option}
          className={`circle-container ${
            thickness === option ? "selected-thickness" : ""
          }`}
          onClick={() => setLineThickness(option)}
        >
          <div
            className="circle"
            style={{ width: option * 2, height: option * 2 }}
          />
        </div>
      ))}
    </div>
  );
}

export default LineThickness;
