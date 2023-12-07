import React from "react";
/**
 * Display who is currently drawing
 * @param {string} username - The username of the user that is drawing
 * @returns
 */
function CurrentlyDrawing({ username }) {
  // Display who is drawing at any given moment
  return (
    <div>
      <h1>{username} is currently drawing!</h1>
    </div>
  );
}
export default CurrentlyDrawing;
