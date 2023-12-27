import express from "express";
import passport from "passport";
import session from "express-session";
import router from "./auth.js";
import { Server as SocketIo } from "socket.io";
import GameDispatcher from "./GameDispatcher.js";

// Initialise the server and establish middleware
/**
 * Initialise Express server and establish middleware
 * @class Server
 */
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
/**
 * @memberof Server
 * Configuring session with required middlewares and key
 */
app.use(
  session({
    secret: "HiddenSecret.",
    resave: false,
    saveUninitialized: false,
  })
);
// Initialise passport for authentication
app.use(passport.initialize());
app.use(passport.session());
// Use authentication routes made in auth.js file
app.use("/auth", router);
// Route for creating a new lobby
/**
 * Create lobby ID and return back to user if authenticated
 * @memberof Server
 * @name post/create-lobby
 * @function create-lobby
 * @param {express.Request} req - Request Object
 * @param {express.Response} res - Response Object
 */
app.post("/create-lobby", (req, res) => {
  // Check the request is authenticated
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: "User not authenticated" });
  }
  const generatedID = games.create();
  return res.status(201).json({ lobbyId: generatedID });
});

app.get("/get-public", (req, res) => {
  const publicLobbies = games.getPublic();
  res.json(publicLobbies);
});

// Listen on port 3001
const server = app.listen(3001);
const io = new SocketIo(server, {
  cors: {
    origin: "*",
  },
});

const games = new GameDispatcher(io);
/**
 * Define event handlers for socket communication
 * @memberof Server
 * @function io.on
 * @param {object} socket - Socket object used for real-time communication
 */
io.on("connection", (socket) => {
  console.log("A user has connected");
  // Handler for joining a lobby
  socket.on("join-lobby", (data) => {
    const { lobbyId, username } = data;
    games.joinGame(lobbyId, socket, username);
  });
  // Handler for drawing events
  socket.on("drawing", (data) => {
    const { lobbyId } = data;
    games.addDrawing(lobbyId, socket, data);
  });
  // Handler for when the user begins drawing
  socket.on("beginDrawing", (data) => {
    const { lobbyId } = data;
    games.beganDrawing(lobbyId);
  });
  socket.on("endDrawing", (data) => {
    const { lobbyId } = data;
    games.endDrawing(lobbyId);
  });
  // Handler for testing if permission has been given to draw
  socket.on("test-drawing-allowed", () => {
    if (socket === firstConnection) {
      socket.emit("drawing-allowed");
    } else {
      socket.emit("drawing-not-allowed");
    }
  });
  // Handler for sending message to rest of the lobby
  socket.on("send-message", (data) => {
    const { text, username, lobbyId } = data;
    socket.emit("correct-message");
    games.messageGame(lobbyId, text, socket);
  });
  // Handler for updating number of rounds for specific lobby
  socket.on("update-rounds", (rounds) => {
    games.updateRounds(socket, rounds);
  });
  // Handler for updating number of minutes for specific lobby
  socket.on("update-minutes", (minutes) => {
    games.updateMinutes(socket, minutes);
  });
  socket.on("update-privacy", (privacy) => {
    games.updatePrivacy(socket, privacy);
  });
  socket.on("update-words", (words) => {
    games.updateWords(socket, words);
  });
  // Handler for removing disconnected users
  socket.on("disconnect", () => {
    games.removePlayer(socket);
  });
  // Handler for starting a game
  socket.on("start-game", () => {
    games.startGame(socket);
  });
  // Handler to establish state of current progression in lobby
  socket.on("initialise-drawings", () => {
    games.initialiseDrawings(socket);
  });
  socket.on("selected-word", (word) => {
    games.setWord(socket.lobbyId, socket, word);
  });
  socket.on("clear-canvas", () => {
    games.clearDrawing(socket.lobbyId, socket);
  });
  socket.on("undo-move", () => {
    games.undoDrawing(socket.lobbyId, socket);
  });
});

export default app;
