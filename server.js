import express from "express";
import passport from "passport";
import session from "express-session";
import router from "./auth.js";
import { Server as SocketIo } from "socket.io";
import GameDispatcher from "./GameDispatcher.js";

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

app.post("/create-lobby", (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: "User not authenticated" });
  }
  const generatedID = games.create();
  return res.status(201).json({ lobbyId: generatedID });
});

// Listen on port 3001
const server = app.listen(3001);
const io = new SocketIo(server, {
  cors: {
    origin: "*",
  },
});

const games = new GameDispatcher(io);
io.on("connection", (socket) => {
  console.log("A user has connected");

  socket.on("join-lobby", (data) => {
    const { lobbyId, username } = data;
    games.joinGame(lobbyId, socket, username);
  });

  socket.on("drawing", (data) => {
    const { lobbyId } = data;
    games.addDrawing(lobbyId, socket, data);
  });
  socket.on("beginDrawing", (data) => {
    const { lobbyId } = data;
    games.beganDrawing(lobbyId);
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
    games.messageGame(lobbyId, text, username);
  });
});

export default app;
