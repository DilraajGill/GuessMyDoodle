import React, { useEffect } from "react";
import axios from "axios";
import checkAuthentication from "./checkAuthentication";
import { authContext } from "./App";
import { useNavigate } from "react-router-dom";

function Store() {
  const [signedIn, setSignedIn] = React.useContext(authContext);
  const navigation = useNavigate();
  useEffect(() => {
    async function ensureLogin() {
      const response = await checkAuthentication({ axios });
      if (response.auth) {
        setSignedIn({
          auth: true,
          username: response.username,
          points: response.points,
          tools: response.tools,
        });
      } else {
        // If not signed in, navigate them to the /login page
        navigation("/login");
      }
    }
    ensureLogin();
  }, []);
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
      <h1>Welcome To The Store {signedIn.username}!</h1>
      <div>
        <h2>Fill Tool</h2>
        <button onClick={purchaseFillTool}>
          {signedIn.tools.includes("fill") ? "Already Own" : "Buy Fill Tool"}
        </button>
      </div>
    </div>
  );
}

export default Store;
