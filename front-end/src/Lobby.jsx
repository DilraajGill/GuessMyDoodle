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
  const [validGame, setValidGame] = React.useState(true);
  const [players, setPlayers] = React.useState([]);
  const navigation = useNavigate();

  useEffect(() => {
    async function ensureLogin() {
      const response = await checkAuthentication({ axios });
      if (response.auth) {
        setSignedIn({
          auth: true,
          username: response.username,
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

    socket.on("invalid-game", () => {
      setValidGame(false);
    });

    socket.on("set-players", (data) => {
      setPlayers(data);
    });
  }, []);

  if (!validGame) {
    return <h1>Invalid Game</h1>;
  }
  return (
    <div>
      <h1>Lobby ID: {lobbyId}</h1>
      <h2>Username: {signedIn.username}</h2>
      <h3>Players:</h3>
      {players.map((player, index) => (
        <div key={index}>
          <strong>{player}</strong>
        </div>
      ))}
      <LineThickness
        thickness={lineThickness}
        setLineThickness={setLineThickness}
      />
      <ColourChooser toCanvas={setSelectedColour} />
      <Canvas
        lineThickness={lineThickness}
        colour={selectedColour}
        socket={socket}
        lobbyId={lobbyId}
      />
      <ChatBox socket={socket} username={signedIn.username} lobbyId />
    </div>
  );
}

export default Lobby;
