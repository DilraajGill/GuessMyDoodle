import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LineThicknessButton from "./LineThicknessButton";
import ColourChooserButton from "./ColourChooserButton";
import Canvas from "./Canvas";
import ChatBox from "./ChatBox";
import socket from "./SocketManager";
import axios from "axios";
import checkAuthentication from "./checkAuthentication";
import { authContext } from "./App";
import GameCustomisation from "./GameCustomisation";
import ChooseWords from "./ChooseWords";
import PlayerCard from "./PlayerCard";
import CopyToClipboard from "./CopyToClipboard";
import { Row, Col, Button, Container, Card } from "react-bootstrap";
import "./Lobby.css";
import Hints from "./Hints";

/**
 * Lobby to handle all interaction of settings, drawing and communication
 * @class Lobby
 */
function Lobby() {
  // Define react states and parameters
  const [signedIn, setSignedIn] = React.useContext(authContext);
  const { lobbyId } = useParams();
  const [selectedColour, setSelectedColour] = React.useState("#000000");
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
  const [customWords, setCustomWords] = React.useState("");
  const [drawingTool, setDrawingTool] = React.useState("draw");
  const [roundTimer, setRoundTimer] = React.useState(null);
  const [roundCount, setRoundCount] = React.useState(0);
  const [host, setHost] = React.useState("");
  const [drawingWord, setDrawingWord] = React.useState("");
  const [hideWord, setHideWord] = React.useState(true);
  const roundTimerRef = React.useRef(null);
  const [revealWord, setRevealWord] = React.useState({ show: false, word: "" });
  const [turnPoints, setTurnPoints] = React.useState([]);
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
          tools: response.tools,
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
      console.log(data);
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
    socket.on("set-privacy", (privacy) => {
      setLobbyType(privacy);
    });
    socket.on("set-words", (words) => {
      setCustomWords(words);
    });
    // Handler to set the state of session
    socket.on("set-state", (state) => {
      setGameState(state);
    });
    socket.on("currently-drawing", (data) => {
      setCurrentlyDrawing(data);
      setNewTimer(minutes * 60 + 5);
      setDrawingWord(`${data} is picking a word!`);
      setHideWord(false);
    });

    socket.on("selected-word", (data) => {
      setHideWord(true);
      setDrawingWord(data);
    });

    socket.on("new-round", (round) => {
      setRoundCount(round);
    });

    socket.on("late-timer", (time) => {
      setNewTimer(time);
    });

    socket.on("choose-words", (words) => {
      setWordOptions(words);
      setToSelectWord(true);
    });

    socket.on("set-host", (username) => {
      console.log(username);
      setHost(username);
    });

    socket.on("reveal-word", (word) => {
      setRevealWord({ show: true, word: word });
      setTimeout(() => setRevealWord({ show: false, word: "" }), 5000);
    });

    socket.on("end-points", (points) => {
      setTurnPoints(points);
    });
  }, []);

  function setNewTimer(duration) {
    setRoundTimer(duration - 5);
    roundTimerRef.current = setInterval(() => {
      setRoundTimer((prev) => {
        if (prev <= 1) {
          clearInterval(roundTimerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }

  if (!validGame) {
    return <h1>Invalid Game</h1>;
  }

  function handleWordClick(word) {
    setToSelectWord(false);
    socket.emit("selected-word", word);
  }

  function clearCanvas() {
    socket.emit("clear-canvas");
  }
  function undoMove() {
    socket.emit("undo-move");
  }

  return (
    <Container fluid className="mt-3">
      <Row>
        {gameState === "drawing" && (
          <Col md={12} className="mb-2">
            <Card>
              <Card.Body>
                <Row>
                  <Col md={4}>
                    <h4 className="game-stats">
                      Round: {roundCount} <i class="bi bi-stopwatch"></i>:
                      <span className={roundTimer < 10 ? "flash" : ""}>
                        {roundTimer}
                      </span>
                    </h4>
                  </Col>
                  <Col md={4}>
                    <div className="d-flex justify-content-center">
                      <Hints word={drawingWord} hidden={hideWord} />
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        )}
        <Col md={3}>
          <div className="player-list">
            {players.map((player, index) => (
              <PlayerCard
                key={index}
                player={player.username}
                points={player.points}
                picture={player.profilePicture}
                drawing={player.username === currentlyDrawing}
                host={player.username === host}
              />
            ))}
          </div>
        </Col>
        {/* If the state is on the settings page, show this information */}
        {gameState === "settings" ? (
          <Col md={8}>
            <GameCustomisation
              socket={socket}
              rounds={rounds}
              minutes={minutes}
              lobbyType={lobbyType}
              customWords={customWords}
            />
            <CopyToClipboard lobbyId={lobbyId}></CopyToClipboard>
          </Col>
        ) : gameState === "drawing" ? (
          <>
            <Col md={6}>
              <div>
                <Row>
                  <Col
                    md={12}
                    className="drawing-word-container"
                    style={{ width: "800px", height: "600px" }}
                  >
                    <Canvas
                      type={drawingTool}
                      lineThickness={lineThickness}
                      colour={selectedColour}
                      socket={socket}
                      lobbyId={lobbyId}
                    />
                    {toSelectWord && (
                      <div className="reveal-word">
                        <ChooseWords
                          list={wordOptions}
                          click={handleWordClick}
                        />
                      </div>
                    )}
                    {revealWord.show && (
                      <div className="reveal-word">
                        <h2>The word was {revealWord.word}</h2>
                        <br />
                        {turnPoints.map((player, index) => (
                          <h4 key={index}>
                            {player.username}: {player.value}
                            <br />
                          </h4>
                        ))}
                      </div>
                    )}
                  </Col>
                  <Col md={12}>
                    <Button onClick={() => setDrawingTool("draw")}>
                      <i class="bi bi-brush"></i>
                    </Button>
                    <Button onClick={() => setDrawingTool("eraser")}>
                      <i class="bi bi-eraser-fill"></i>
                    </Button>
                    {signedIn.tools && signedIn.tools.includes("fill") && (
                      <Button onClick={() => setDrawingTool("fill")}>
                        <i class="bi bi-paint-bucket"></i>
                      </Button>
                    )}
                    <Button type="button" onClick={clearCanvas}>
                      <i class="bi bi-trash-fill"></i>
                    </Button>
                    <Button type="button" onClick={undoMove}>
                      <i class="bi bi-arrow-counterclockwise"></i>
                    </Button>
                    <LineThicknessButton
                      thickness={lineThickness}
                      setLineThickness={setLineThickness}
                    />
                    <ColourChooserButton
                      setSelectedColour={setSelectedColour}
                    />
                  </Col>
                </Row>
              </div>
            </Col>
            <Col md={3}>
              <ChatBox
                socket={socket}
                username={signedIn.username}
                lobbyId={lobbyId}
              />
            </Col>
          </>
        ) : (
          <Col md={9}>
            <h1>The Game Has Finished!</h1>
          </Col>
        )}
      </Row>
    </Container>
  );
}

export default Lobby;
