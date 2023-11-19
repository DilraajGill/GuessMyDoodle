import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LineThickness from "./LineThickness";
import ColourChooser from "./ColourChooser";
import Canvas from "./Canvas";
import ChatBox from "./ChatBox";
import socket from "./SocketManager";
import axios from "axios";
import checkAuthentication from "./checkAuthentication";
import { authContext } from "./App";

function Lobby() {
  const [signedIn, setSignedIn] = React.useContext(authContext);
  const { lobbyId } = useParams();
  const [selectedColour, setSelectedColour] = React.useState("#00000");
  const [lineThickness, setLineThickness] = React.useState(2);
  const navigation = useNavigate();

  useEffect(() => {
    async function ensureLogin() {
      const response = await checkAuthentication({ axios });
      if (response.auth) {
        setSignedIn({
          auth: true,
          username: response.username,
          // Temporary points
          points: response.points,
        });
        socket.emit("join-lobby", {
          lobbyId,
          username: response.username,
        });
      } else {
        navigation("/login");
      }
    }
    ensureLogin();
  }, []);

  return (
    <div>
      <h1>Lobby ID: {lobbyId}</h1>
      <h2>Username: {signedIn.username}</h2>
      <LineThickness
        thickness={lineThickness}
        setLineThickness={setLineThickness}
      />
      <ColourChooser toCanvas={setSelectedColour} />
      <Canvas
        lineThickness={lineThickness}
        colour={selectedColour}
        socket={socket}
      />
      <ChatBox socket={socket} username={signedIn.username} />
    </div>
  );
}

export default Lobby;
