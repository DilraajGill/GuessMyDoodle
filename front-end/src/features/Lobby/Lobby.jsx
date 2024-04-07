import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LineThicknessButton from "./LineThicknessButton";
import Canvas from "./Canvas";
import ChatBox from "./ChatBox";
import socket from "../../components/SocketManager";
import { authContext } from "../../App";
import GameCustomisation from "./GameCustomisation";
import ChooseWords from "./ChooseWords";
import PlayerCard from "./PlayerCard";
import CopyToClipboard from "./CopyToClipboard";
import { Row, Col, Container, Card } from "react-bootstrap";
import ColourChooser from "./ColourChooser";
import "../../styles/Lobby.css";
import Hints from "./Hints";
import ExpiredSession from "./ExpiredSession";
import CanvasToolbar from "./CanvasToolbar";
import RevealWord from "./RevealWord";
import Podium from "./Podium";
import ConfirmKick from "./ConfirmKick";

/**
 * Lobby to handle all interaction of settings, drawing and communication
 * @class Lobby
 */
function Lobby() {
  // Define react states and parameters
  const [signedIn] = React.useContext(authContext);
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
  const [podiumPositions, setPodiumPositions] = React.useState([]);
  const [userPosition, setUserPosition] = React.useState();
  const [showModal, setShowModal] = React.useState(false);
  const [showKickModal, setShowKickModal] = React.useState(false);
  const [selectedKickUser, setSelectedKickUser] = React.useState(null);
  const navigation = useNavigate();

  /**
   * Ran at the start to ensure only authorised users are permitted
   * @function ensureLogin
   * @memberof Lobby
   */
  useEffect(() => {
    socket.emit("join-lobby", {
      lobbyId,
      username: signedIn.username,
    });

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
    socket.on("set-privacy", (privacy) => {
      setLobbyType(privacy);
    });
    socket.on("set-words", (words) => {
      setCustomWords(words);
    });
    // Handler to set the state of session
    socket.on("set-state", async (state) => {
      if (state === "end") {
        calculatePodiumPositions();
      }
      setGameState(state);
    });
    // Handler to store who is currently drawing
    socket.on("currently-drawing", (data) => {
      setCurrentlyDrawing(data);
      setNewTimer(minutes * 60 + 5);
      setDrawingWord(`${data} is picking a word!`);
      setHideWord(false);
    });
    // Handler to select a word if drawing
    socket.on("selected-word", (data) => {
      setHideWord(true);
      setDrawingWord(data);
    });
    // Handler to make new round
    socket.on("new-round", (round) => {
      setRoundCount(round);
    });
    // Handler to set timer if user joins late
    socket.on("late-timer", (time) => {
      setNewTimer(time);
    });
    // Handler to display word options
    socket.on("choose-words", (words) => {
      setWordOptions(words);
      setToSelectWord(true);
    });
    // Handler to set the new host
    socket.on("set-host", (username) => {
      setHost(username);
    });
    // Handler to reveal the word at the end of the game
    socket.on("reveal-word", (word) => {
      setRevealWord({ show: true, word: word });
      setTimeout(() => setRevealWord({ show: false, word: "" }), 5000);
    });
    // Handler to display the points at the end of the game
    socket.on("end-points", (points) => {
      setTurnPoints(points);
    });
    // Handler to kick user out of the game if not enough players
    socket.on("not-enough-players", () => {
      setShowModal(true);
    });
    // Handler to kick any user back to the home page
    socket.on("kicked", (message) => {
      navigation("/home", { state: { kicked: true, message } });
    });
    // Event listenener to process key binds
    window.addEventListener("keydown", keyDown);

    return () => {
      socket.emit("leave-session");
      window.removeEventListener("keydown", keyDown);
    };
  }, []);
  // Effect function to handle the end of the game and calculate podium positions
  useEffect(() => {
    if (gameState === "end") {
      calculatePodiumPositions();
    }
  }, [gameState]);
  // Automatically select a word if the user has not submitted their selection
  useEffect(() => {
    let wordTimer;

    if (toSelectWord) {
      wordTimer = setTimeout(() => {
        if (toSelectWord && wordOptions.length > 0) {
          handleWordClick(wordOptions[0]);
        }
      }, 10000);
    }

    return () => {
      clearTimeout(wordTimer);
    };
  }, [toSelectWord, wordOptions]);

  // Function to set a timer when drawing
  function setNewTimer(duration) {
    clearInterval(roundTimerRef.current);
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
  // Custom return if the user has not selected a valid lobby
  if (!validGame) {
    return <h1 style={{ color: "aliceblue" }}>Invalid Game</h1>;
  }
  // Function to handle word selection
  function handleWordClick(word) {
    setToSelectWord(false);
    socket.emit("selected-word", word);
  }
  // Function to clear the canvas if clicked
  function clearCanvas() {
    socket.emit("clear-canvas");
  }
  // Function to undo the most recent move if clicked
  function undoMove() {
    socket.emit("undo-move");
  }
  // Function to calculate the podium positions according to the points
  function calculatePodiumPositions() {
    const sorted = [...players].sort((a, b) => b.points - a.points);
    setPodiumPositions(sorted.slice(0, Math.min(3, players.length)));
    const userIndex = sorted.findIndex(
      (player) => player.username === signedIn.username
    );
    setUserPosition(userIndex + 1);
  }
  // Function called if the host wants to play again
  function playAgain() {
    socket.emit("play-again");
  }
  // Function to display modal if trying to kick a user out
  function handleKick(player) {
    if (host === signedIn.username && player !== signedIn.username) {
      setSelectedKickUser(player);
      setShowKickModal(true);
    }
  }
  // Function to emit message to server and kick user
  function confirmedKick() {
    if (host === signedIn.username) {
      socket.emit("kick-player", selectedKickUser);
      setShowKickModal(false);
      setSelectedKickUser(null);
    }
  }
  // Function to execute drawing action according to keybinds
  function keyDown(ev) {
    if (document.activeElement.tagName.toLowerCase() === "input") return;
    switch (ev.key.toUpperCase()) {
      case "U":
        undoMove();
        break;
      case "B":
        setDrawingTool("draw");
        break;
      case "E":
        setDrawingTool("eraser");
        break;
      case "F":
        if (signedIn.tools.includes("fill")) {
          setDrawingTool("fill");
        }
        break;
      default:
        break;
    }
  }

  return (
    <Container fluid className="mt-3">
      <Row>
        {gameState !== "settings" && (
          <Col md={12} className="mb-2">
            <Card>
              <Card.Body>
                <Row>
                  <Col md={4}>
                    <h4 className="game-stats">
                      <i class="bi bi-stopwatch"></i>:
                      <span className={roundTimer < 10 ? "flash" : ""}>
                        {roundTimer}
                      </span>
                    </h4>
                  </Col>
                  <Col md={4}>
                    <div className="d-flex justify-content-center">
                      <Hints
                        word={drawingWord}
                        hidden={hideWord}
                        drawing={currentlyDrawing === signedIn.username}
                      />
                    </div>
                  </Col>
                  <Col md={4}>
                    <h4
                      className="game-stats"
                      style={{ flexDirection: "row-reverse" }}
                    >
                      <span>:{roundCount}</span>
                      <i class="bi bi-arrow-repeat" />
                    </h4>
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
                kick={handleKick}
              />
            ))}
            <ConfirmKick
              show={showKickModal}
              onHide={() => {
                setShowKickModal(false);
                setSelectedKickUser(null);
              }}
              kickUser={confirmedKick}
              selectedUser={selectedKickUser}
            />
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
              length={players.length}
            />
            <CopyToClipboard lobbyId={lobbyId}></CopyToClipboard>
          </Col>
        ) : (
          <>
            <Col md={6}>
              <div>
                <Row>
                  <Col md={12} className="drawing-word-container">
                    <Canvas
                      type={drawingTool}
                      lineThickness={lineThickness}
                      colour={selectedColour}
                      socket={socket}
                      lobbyId={lobbyId}
                    />
                    {toSelectWord && gameState === "drawing" && (
                      <div className="reveal-word">
                        <ChooseWords
                          list={wordOptions}
                          click={handleWordClick}
                        />
                      </div>
                    )}
                    {gameState === "end" && (
                      <Podium
                        podiumPositions={podiumPositions}
                        userPosition={userPosition}
                        playAgain={playAgain}
                      />
                    )}
                    {revealWord.show && (
                      <RevealWord
                        revealWord={revealWord}
                        turnPoints={turnPoints}
                      />
                    )}
                  </Col>
                  <Col md={12} className="canvas-toolbar">
                    <div className="toolbar-group left-side">
                      <ColourChooser toCanvas={setSelectedColour} />
                      <LineThicknessButton
                        thickness={lineThickness}
                        setLineThickness={setLineThickness}
                      />
                    </div>
                    <CanvasToolbar
                      drawingTool={drawingTool}
                      setDrawingTool={setDrawingTool}
                      ownedTools={signedIn.tools}
                      undoMove={undoMove}
                      clearCanvas={clearCanvas}
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
        )}
      </Row>
      <ExpiredSession
        show={showModal}
        onClose={() => {
          setShowModal(false);
          navigation("/home");
        }}
      />
    </Container>
  );
}

export default Lobby;
