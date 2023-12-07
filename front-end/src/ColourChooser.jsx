import React from "react";
import { SketchPicker } from "react-color";

function ColourChooser({ toCanvas }) {
  // Create state to store the chosen colour
  const [colour, setColour] = React.useState("#000");
  // Create method to update state and communicate this change to lobby
  function changeColour(choice) {
    setColour(choice.hex);
    toCanvas(choice.hex);
  }
  return (
    <div>
      <SketchPicker color={colour} onChange={changeColour} />
    </div>
  );
}

export default ColourChooser;
