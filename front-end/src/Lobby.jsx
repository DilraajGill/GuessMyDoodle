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
import GameCustomisation from "./GameCustomisation";
import CurrentlyDrawing from "./CurrentlyDrawing";
import ChooseWords from "./ChooseWords";

/**
 * Lobby to handle all interaction of settings, drawing and communication
 * @class Lobby
 */
function Lobby() {
  // Define react states and parameters
  const [signedIn, setSignedIn] = React.useContext(authContext);
  const { lobbyId } = useParams();
  const [selectedColour, setSelectedColour] = React.useState("#00000");
  const [lineThickness, setLineThickness] = React.useState(2);
  const [validGame, setValidGame] = React.useState(true);
  const [players, setPlayers] = React.useState([]);
  const [minutes, setMinutes] = React.useState(1);
  const [rounds, setRounds] = React.useState(1);
  const [gameState, setGameState] = React.useState("settings");
  const [currentlyDrawing, setCurrentlyDrawing] = React.useState("");
  const [toSelectWord, setToSelectWord] = React.useState(false);
  const [wordOptions, setWordOptions] = React.useState([]);
  const [lobbyType, setLobbyType] = React.useState("private");
  const navigation = useNavigate();

  /**
   * Ran at the start to ensure only authorised users are permitted
   * @function ensureLogin
   * @memberof Lobby
   */
  useEffect(() => {
    // Ensure that the user is signed in, else emit them to the login page
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
    // Handler to determine invalid sessions
    socket.on("invalid-game", () => {
      setValidGame(false);
    });
    // Handler to set player information
    socket.on("set-players", (data) => {
      setPlayers(data);
    });
    // Handler to set the number of rounds
    socket.on("set-rounds", (rounds) => {
      setRounds(rounds);
    });
    // Handler to set the number of minutes
    socket.on("set-minutes", (minutes) => {
      setMinutes(minutes);
    });
    // Handler to set the state of session
    socket.on("set-state", (state) => {
      setGameState(state);
    });
    socket.on("currently-drawing", (data) => {
      console.log(data);
      setCurrentlyDrawing(data);
    });

    socket.on("choose-words", (words) => {
      setWordOptions(words);
      setToSelectWord(true);
      console.log(words);
    });
  }, []);
  // If the game is invalid, it should display to user
  if (!validGame) {
    return <h1>Invalid Game</h1>;
  }

  function handleWordClick(word) {
    setToSelectWord(false);
    socket.emit("selected-word", word);
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
      {/* If the state is on the settings page, show this information */}
      {gameState === "settings" ? (
        <div>
          <GameCustomisation
            socket={socket}
            rounds={rounds}
            minutes={minutes}
          />
        </div>
      ) : gameState === "drawing" ? (
        <div>
          {toSelectWord ? (
            <div>
              <ChooseWords list={wordOptions} click={handleWordClick} />
            </div>
          ) : (
            <div>
              <CurrentlyDrawing username={currentlyDrawing} />
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
              <ChatBox
                socket={socket}
                username={signedIn.username}
                lobbyId={lobbyId}
              />
            </div>
          )}
        </div>
      ) : (
        <div>
          <h1>The Game Has Finished!</h1>
        </div>
      )}
    </div>
  );
}

export default Lobby;
