import React from "react";
import axios from "axios";
function Store() {
  async function purchaseFillTool() {
    try {
      const response = await axios.post("/store/buy/fill-tool");
      console.log(response.data.success);
    } catch (error) {
      console.log("Error purchasing fill tool");
    }
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
