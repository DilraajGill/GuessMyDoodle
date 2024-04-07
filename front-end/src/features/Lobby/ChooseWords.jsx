import React from "react";
import { Button } from "react-bootstrap";

/**
 * Display the options as buttons to display to the user
 * @param {Array<string>} props.list Array of words to be chosen as choices
 * @param {Function} props.click Function when word is clicked
 * @returns {React.Component} Component displaying the list of word options to draw
 */
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
