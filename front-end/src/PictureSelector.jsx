import React, { useEffect } from "react";
import axios from "axios";

function PictureSelector({ currentPicture, availablePictures }) {
  const [selectedPicture, setSelectedPicture] = React.useState(null);

  function updatePicture() {
    // POST to the server the new profile picture to use
  }
  return (
    <div>
      <img
        src={currentPicture}
        data-testId="current"
        className="current-picture"
      />
      {availablePictures.map((pic) => (
        <img
          src={`../${pic}`}
          key={pic}
          data-testId="available"
          className="available-picture"
        ></img>
      ))}
    </div>
  );
}

export default PictureSelector;
