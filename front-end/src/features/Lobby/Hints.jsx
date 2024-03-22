import React from "react";

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
