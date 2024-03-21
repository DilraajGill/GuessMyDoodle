import React from "react";

/**
 * Allow the user drawing to change the colour they wish to draw with
 * @class ColourChooser
 * @param {function} toCanvas - Modify state and update through callback function
 */
function ColourChooser({ toCanvas }) {
  // Create state to store the chosen colour
  const [selectedColour, setSelectedColour] = React.useState("#000000");
  const availableLightColours = [
    "#FFFFFF",
    "#A5A3A3",
    "#CF0000",
    "#CF5300",
    "#CEC900",
    "#00C300",
    "#00C374",
    "#00A3CF",
    "#0B09CF",
    "#9E00B2",
    "#CE478F",
    "#CF8A68",
    "#953910",
  ];
  const availableDarkColours = [
    "#000000",
    "#3A3A3A",
    "#6D0000",
    "#BC1B00",
    "#C98300",
    "#003A05",
    "#016848",
    "#014393",
    "#00005E",
    "#4C005F",
    "#7A193F",
    "#B8572B",
    "#571900",
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
      <div className="light-colours">
        {availableLightColours.map((colour) => (
          <div
            key={colour}
            className={`colour-item light ${
              colour === selectedColour ? "selected" : ""
            }`}
            style={{ backgroundColor: colour }}
            onClick={() => changeColour(colour)}
          >
            <div className="colour-inner" style={{ backgroundColor: colour }} />
          </div>
        ))}
      </div>
      <div className="dark-colours">
        {availableDarkColours.map((colour) => (
          <div
            key={colour}
            className={`colour-item dark ${
              colour === selectedColour ? "selected" : ""
            }`}
            style={{ backgroundColor: colour }}
            onClick={() => changeColour(colour)}
          >
            <div className="colour-inner" style={{ backgroundColor: colour }} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ColourChooser;
