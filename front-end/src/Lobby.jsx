import React from "react";
import { useParams } from "react-router-dom";
import LineThickness from "./LineThickness";
import ColourChooser from "./ColourChooser";
import Canvas from "./Canvas";
import ChatBox from "./ChatBox";
import socket from "./SocketManager";

function Lobby() {
  const { lobbyId } = useParams();
  const [selectedColour, setSelectedColour] = React.useState("#00000");
  const [lineThickness, setLineThickness] = React.useState(2);

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
