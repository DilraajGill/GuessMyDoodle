import React from "react";

/**
 * Display the hints for the word with the letters hidden
 * If the user is drawing, it will show the actual word, else it will display the hidden word
 * @param {string} props.word The word being drawn
 * @param {boolean} props.hidden Determine if the word should be hidden
 * @param {boolean} props.drawing Determine if the user is drawing
 * @returns
 */
function Hints({ word, hidden, drawing }) {
  return (
    <div className="hints-container text-center">
      {hidden ? (
        word.split("").map((letter, index) => (
          <div className="hint" key={index} data-testid="hint">
            {drawing ? letter : letter === " " ? " " : "_"}
          </div>
        ))
      ) : (
        <div className="hint-picking">{word}</div>
      )}
    </div>
  );
}
export default Hints;
