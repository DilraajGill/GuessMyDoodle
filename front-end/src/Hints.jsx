import React from "react";

function Hints({ word, hidden }) {
  return (
    <div className="hints-container">
      {word.split("").map((letter, index) => (
        <div className="hint" key={index}>
          {hidden ? "_" : letter}
        </div>
      ))}
    </div>
  );
}
export default Hints;
