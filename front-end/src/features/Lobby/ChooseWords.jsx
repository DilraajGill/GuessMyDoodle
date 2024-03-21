import React from "react";
import { Button } from "react-bootstrap";

function ChooseWords({ list, click }) {
  return (
    <div>
      <h3>Select a word:</h3>
      {list.map((word) => (
        <Button className="m-2" key={word} onClick={() => click(word)}>
          {word}
        </Button>
      ))}
    </div>
  );
}

export default ChooseWords;
