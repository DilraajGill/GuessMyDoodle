import React from "react";

/**
 * Allow the user drawing to change the colour they wish to draw with
 * @class ColourChooser
 * @param {function} toCanvas - Modify state and update through callback function
 */
function ColourChooser({ toCanvas }) {
  // Create state to store the chosen colour
  const [selectedColour, setSelectedColour] = React.useState("#000000");
  const availableColours = [
    "#FFFFFF",
    "#C1C1C1",
    "#EF130B",
    "#FF7100",
    "#FFE400",
    "#00CC00",
    "#00B2FF",
    "#231FD3",
    "#A300BA",
    "#D37CAA",
    "#A0522D",
    "#000000",
  ];
  // Create method to update state and communicate this change to lobby
  /**
   * Update the colour for necessary States
   * @function changeColour
   * @memberof ColourChooser
   */
  function changeColour(choice) {
    setSelectedColour(choice);
    toCanvas(choice);
  }
  return (
    <div className="colour-picker">
      {availableColours.map((colour) => (
        <div
          key={colour}
          className={`colour-item ${
            colour === selectedColour ? "selected" : ""
          }`}
          style={{ backgroundColor: colour }}
          onClick={() => changeColour(colour)}
        >
          <div className="colour-inner" style={{ backgroundColor: colour }} />
        </div>
      ))}
    </div>
  );
}

export default ColourChooser;
