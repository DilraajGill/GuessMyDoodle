import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LineThickness from "./LineThickness";
import ColourChooser from "./ColourChooser";
import Canvas from "./Canvas";
import ChatBox from "./ChatBox";
import socket from "./SocketManager";
import axios from "axios";
import checkAuthentication from "./checkAuthentication";

function Lobby() {
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
          points: 0,
        });
      } else {
        navigation("/login");
      }
    }
    ensureLogin();
  });

  return (
    <div>
      <h1>Lobby ID: {lobbyId}</h1>
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
      <ChatBox socket={socket} username="Test Name 123" />
    </div>
  );
}

export default Lobby;
