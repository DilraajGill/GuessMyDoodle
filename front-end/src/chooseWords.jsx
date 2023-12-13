import React from "react";

function ChooseWords({ list, click }) {
  console.log(list);
  return (
    <div>
      <h3>Select a word:</h3>
      {list.map((word) => (
        <button key={word} onClick={() => click(word)}>
          {word}
        </button>
      ))}
    </div>
  );
}

export default ChooseWords;
