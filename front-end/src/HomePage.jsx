import React, { useEffect } from "react";
import axios from "axios";
import { authContext } from "./App";
import { useNavigate } from "react-router-dom";
import checkAuthentication from "./checkAuthentication";

function HomePage() {
  const [signedIn, setSignedIn] = React.useContext(authContext);
  const navigation = useNavigate();

  useEffect(() => {
    async function ensureLogin() {
      const response = await checkAuthentication({ axios });
      if (response.auth) {
        setSignedIn({
          auth: true,
          username: response.username,
          // Temporary points assignment
          points: response.points,
        });
      } else {
        navigation("/login");
      }
    }
    ensureLogin();
  });

  async function createLobby() {
    try {
      const response = await axios.post("/create-lobby");
      const lobbyId = response.data.lobbyId;
      navigation(`/lobby/${lobbyId}`);
    } catch (error) {
      console.log("Error making lobby");
    }
  }

  return <h1>Home Page</h1>;
}

export default HomePage;
