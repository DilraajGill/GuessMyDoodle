import React from "react";

function LineThickness({ thickness, setLineThickness }) {
  // Component to adjust the line thickness of brush
  return (
    <div>
      <label>Line Thickness:</label>
      <input
        type="range"
        min="1"
        max="10"
        value={thickness}
        onChange={(e) => setLineThickness(parseInt(e.target.value))}
      />
    </div>
  );
}

export default LineThickness;
