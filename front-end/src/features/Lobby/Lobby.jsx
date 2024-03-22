import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LineThicknessButton from "./LineThicknessButton";
import Canvas from "./Canvas";
import ChatBox from "./ChatBox";
import socket from "../../components/SocketManager";
import { authContext } from "../../App";
import GameCustomisation from "./GameCustomisation";
import ChooseWords from "./ChooseWords";
import PlayerCard from "../../components/PlayerCard";
import CopyToClipboard from "./CopyToClipboard";
import { Row, Col, Button, Container, Card, Modal } from "react-bootstrap";
import ColourChooser from "./ColourChooser";
import "../../styles/Lobby.css";
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
      setHost(username);
    });

    socket.on("reveal-word", (word) => {
      setRevealWord({ show: true, word: word });
      setTimeout(() => setRevealWord({ show: false, word: "" }), 5000);
    });

    socket.on("end-points", (points) => {
      setTurnPoints(points);
    });

    socket.on("not-enough-players", () => {
      setShowModal(true);
    });

    socket.on("kicked", (message) => {
      navigation("/home", { state: { kicked: true, message } });
    });

    return () => {
      socket.emit("leave-session");
    };
  }, []);

  useEffect(() => {
    if (gameState === "end") {
      calculatePodiumPositions();
    }
  }, [gameState]);

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

  function calculatePodiumPositions() {
    const sorted = [...players].sort((a, b) => b.points - a.points);
    setPodiumPositions(sorted.slice(0, Math.min(3, players.length)));
    const userIndex = sorted.findIndex(
      (player) => player.username === signedIn.username
    );
    setUserPosition(userIndex + 1);
  }

  function playAgain() {
    socket.emit("play-again");
  }

  function handleKick(player) {
    if (host === signedIn.username && player !== signedIn.username) {
      setSelectedKickUser(player);
      setShowKickModal(true);
    }
  }

  function confirmedKick() {
    if (host === signedIn.username) {
      socket.emit("kick-player", selectedKickUser);
      setShowKickModal(false);
      setSelectedKickUser(null);
    }
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
                      <Hints
                        word={drawingWord}
                        hidden={hideWord}
                        drawing={currentlyDrawing === signedIn.username}
                      />
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
                kick={handleKick}
              />
            ))}
            <Modal
              show={showKickModal}
              onHide={() => {
                setShowKickModal(false);
                setSelectedKickUser(null);
              }}
            >
              <Modal.Header>Kick Player!</Modal.Header>
              <Modal.Body>
                Are you sure you want kick {selectedKickUser}
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={() => {
                    setShowKickModal(false);
                    setSelectedKickUser(null);
                  }}
                >
                  Cancel
                </Button>
                <Button variant="danger" onClick={confirmedKick}>
                  Kick
                </Button>
              </Modal.Footer>
            </Modal>
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
                      <div className="reveal-word">
                        <div className="podium">
                          {podiumPositions.map((player, index) => (
                            <div
                              className={`podium-position place-${index + 1}`}
                            >
                              <div className="podium-user">
                                <div className="profile-information">
                                  <img
                                    src={`../${player.profilePicture}`}
                                    className="picture"
                                  />
                                  <div className="username">
                                    {player.username}
                                  </div>
                                </div>
                                <span className="position-number">
                                  #{index + 1}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="finish-message">
                          <h3>{`You finished ${userPosition}${
                            userPosition === 1
                              ? "st"
                              : userPosition === 2
                              ? "nd"
                              : userPosition === 3
                              ? "rd"
                              : "th"
                          }`}</h3>
                        </div>
                        <Button onClick={playAgain}>Play Again!</Button>
                      </div>
                    )}
                    {revealWord.show && (
                      <div className="reveal-word">
                        <h2>The word was {revealWord.word}</h2>
                        <Row className="justify-content-md-center reveal-points">
                          {turnPoints.map((player, index) => (
                            <Col
                              md={12}
                              key={index}
                              className="player-point-container"
                            >
                              <span className="player-name">
                                {player.username}:
                              </span>

                              <span className="player-points">
                                {player.value}
                              </span>
                            </Col>
                          ))}
                        </Row>
                      </div>
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
                    <div className="toolbar-group right-side">
                      <Button
                        onClick={() => setDrawingTool("draw")}
                        className={drawingTool === "draw" ? "active-tool" : ""}
                      >
                        <i class="bi bi-brush"></i>
                      </Button>
                      <Button
                        onClick={() => setDrawingTool("eraser")}
                        className={
                          drawingTool === "eraser" ? "active-tool" : ""
                        }
                      >
                        <i class="bi bi-eraser-fill"></i>
                      </Button>
                      {signedIn.tools && signedIn.tools.includes("fill") && (
                        <Button
                          onClick={() => setDrawingTool("fill")}
                          className={
                            drawingTool === "fill" ? "active-tool" : ""
                          }
                        >
                          <i class="bi bi-paint-bucket"></i>
                        </Button>
                      )}
                      <Button type="button" onClick={undoMove}>
                        <i class="bi bi-arrow-counterclockwise"></i>
                      </Button>
                      <Button type="button" onClick={clearCanvas}>
                        <i class="bi bi-trash-fill"></i>
                      </Button>
                    </div>
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
      <Modal
        show={showModal}
        onHide={() => {
          setShowModal(false);
          navigation("/home");
        }}
        centered
      >
        <Modal.Header closeButton>Session Expired</Modal.Header>
        <Modal.Body>
          The session has ended becasue there are not enough players in the
          game!
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setShowModal(false);
              navigation("/home");
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Lobby;
