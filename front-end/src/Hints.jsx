import React from "react";

function Hints({ word, hidden }) {
  return (
    <div className="hints-container">
      {hidden ? (
        word.split("").map((letter, index) => (
          <div className="hint" key={index}>
            {letter === " " ? " " : "_"}
          </div>
        ))
      ) : (
        <div className="hint-picking">{word}</div>
      )}
    </div>
  );
}
export default Hints;
