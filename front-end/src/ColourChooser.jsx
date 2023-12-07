import React from "react";
import { SketchPicker } from "react-color";

/**
 * Allow the user drawing to change the colour they wish to draw with
 * @class ColourChooser
 * @param {function} toCanvas - Modify state and update through callback function
 */
function ColourChooser({ toCanvas }) {
  // Create state to store the chosen colour
  const [colour, setColour] = React.useState("#000");
  // Create method to update state and communicate this change to lobby
  /**
   * Update the colour for necessary States
   * @function changeColour
   * @memberof ColourChooser
   */
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
