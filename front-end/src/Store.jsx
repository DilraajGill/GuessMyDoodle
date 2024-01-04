import React from "react";
import axios from "axios";
function Store() {
  async function purchaseFillTool() {
    console.log("Running");
  }
  return (
    <div>
      <h1>Welcome To The Store!</h1>
      <div>
        <h2>Fill Tool</h2>
        <button onClick={purchaseFillTool}>Buy Fill Tool</button>
      </div>
    </div>
  );
}

export default Store;
