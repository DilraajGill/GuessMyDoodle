import express from "express";
import passport from "passport";
import session from "express-session";
import router from "./auth.js";
import { Server as SocketIo } from "socket.io";
import Game from "./Game.js";

var games = {};
// Initialise the server and establish middleware
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "HiddenSecret.",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", router);

function generateLobbyID() {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let output = "";
  for (let x = 0; x < 5; x++) {
    output += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return output;
}

app.post("/create-lobby", (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: "User not authenticated" });
  }
  const generatedID = generateLobbyID();
  while (games[generatedID]) {
    generatedID = generateLobbyID();
  }
  games[generatedID] = new Game(generatedID, io);
  return res.status(201).json({ lobbyId: generatedID });
});

// Listen on port 3001
const server = app.listen(3001);
const io = new SocketIo(server, {
  cors: {
    origin: "*",
  },
});

var firstConnection;

io.on("connection", (socket) => {
  console.log("A user has connected");
  if (!firstConnection) {
    socket.emit("drawing-allowed");
    firstConnection = socket;
  } else {
    socket.emit("drawing-not-allowed");
  }

  socket.on("join-lobby", (data) => {
    const { lobbyId, username } = data;
    console.log(`${username} is trying to join ${lobbyId}`);
    if (!games[lobbyId]) {
      socket.emit("invalid-game");
    } else {
      socket.username = username;
      socket.lobbyId = lobbyId;
      socket.points = 0;
      socket.join(lobbyId);
      games[lobbyId].addPlayer(socket, username);
      console.log(`Added ${username} to the lobby`);
    }
  });

  socket.on("drawing", (data) => {
    const { lobbyId } = data;
    if (!games[lobbyId]) {
      socket.emit("incorrectDrawing");
    } else if (socket === games[lobbyId].host) {
      io.to(lobbyId).emit("drawing", data);
    }
  });
  socket.on("beginDrawing", (data) => {
    const { lobbyId } = data;
    io.to(lobbyId).emit("beginDrawing");
  });

  socket.on("test-drawing-allowed", () => {
    if (socket === firstConnection) {
      socket.emit("drawing-allowed");
    } else {
      socket.emit("drawing-not-allowed");
    }
  });

  socket.on("send-message", (data) => {
    const { text, username, lobbyId } = data;
    socket.emit("correct-message");
    io.to(lobbyId).emit("receive-message", { text, username });
  });
});

export default app;
