import React from "react";
import { Button } from "react-bootstrap";

function ChooseWords({ list, click }) {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center">
      <h3>Select a word:</h3>
      <div className="d-flex">
        {list.map((word) => (
          <Button className="m-2" key={word} onClick={() => click(word)}>
            {word}
          </Button>
        ))}
      </div>
    </div>
  );
}

export default ChooseWords;
