import React from "react";

function CurrentlyDrawing({ username }) {
  // Display who is drawing at any given moment
  return (
    <div>
      <h1>{username} is currently drawing!</h1>
    </div>
  );
}
export default CurrentlyDrawing;
