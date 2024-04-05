import express from "express";
import passport from "passport";
import session from "express-session";
import router from "./auth.js";
import { Server as SocketIo } from "socket.io";
import GameDispatcher from "./game/GameDispatcher.js";
import { User } from "./models/Database.js";

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
// Route for getting list of all public lobbies
/**
 * Retrieve and return list of all available public lobbies
 * @memberof Server
 * @name post/get-public
 * @function get-public
 * @param {express.Request} req - Request Object
 * @param {express.Response} res - Response Object
 */
app.get("/get-public", async (req, res) => {
  const publicLobbies = await games.getPublic();
  res.json(publicLobbies);
});
// Route for buying the fill tool
/**
 * Buy the fill tool on the user account if authenticated and containing enough points
 * @memberof Server
 * @name post/store/buy/fill-tool
 * @function buy-fill-tool
 * @param {express.Request} req - Request Object
 * @param {express.Response} res - Response Object
 */
app.post("/store/buy/fill-tool", async (req, res) => {
  // Check if authenticated
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: "User not authenticated" });
  }
  const user = await User.findById(req.user.id);
  // Check if user already owns the fill tool
  if (user.purchasedTools.includes("fill")) {
    return res.status(400).send("Fill tool already purchased");
  }
  // Check if user has enough points for the item
  if (user.points >= 10000) {
    user.points -= 10000;
    user.purchasedTools.push("fill");
    await user.save();
    return res.send({ success: true });
  }
  res.status(400).send("Not enough points!");
});
// Route for buying the icon selected
/**
 * Buy the requested profile icon on the user account if authenticated and containing enough points
 * @memberof Server
 * @name post/store/buy/iconId
 * @function buy-icon
 * @param {express.Request} req - Request Object
 * @param {express.Response} res - Response Object
 */
app.post("/store/buy/:iconId", async (req, res) => {
  const iconId = req.params.iconId;
  // Check if authenticated
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: "User not authenticated" });
  }
  const user = await User.findById(req.user.id);
  // Check if user already owns the profile icon
  if (user.purchasedProfilePicture.includes(`${iconId}.jpg`)) {
    return res.status(400).send("Picture already purchased!");
  }
  // Check if user has enough points
  if (user.points >= 5000) {
    user.points -= 5000;
    user.purchasedProfilePicture.push(`${iconId}.jpg`);
    user.profilePicture = `${iconId}.jpg`;
    await user.save();
    return res.send({ success: true });
  }
  res.status(400).send("Not enough points!");
});

// Route for buying the fill tool
/**
 * Buy the fill tool on the user account if authenticated and containing enough points
 * @memberof Server
 * @name post/update-picture
 * @function update-picture
 * @param {express.Request} req - Request Object
 * @param {express.Response} res - Response Object
 */
app.post("/update-picture", async (req, res) => {
  // Check if authenticated
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: "User not authenticated" });
  }
  const user = await User.findById(req.user.id);
  // Check if user owns picture they are trying to change to - else return errro
  const { picture } = req.body;
  if (user.purchasedProfilePicture.includes(picture)) {
    user.profilePicture = picture;

    await user.save();

    res.json({ message: "Successfully updated!" });
  } else {
    res.status(400).json({ error: "Picture not purchased" });
  }
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
  // Handler for joining a lobby
  socket.on("join-lobby", async (data) => {
    const { lobbyId, username } = data;
    await games.joinGame(lobbyId, socket, username);
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
  // Handler for when the user stops drawing
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
  // Handler for updating the privacy of specific lobby
  socket.on("update-privacy", (privacy) => {
    games.updatePrivacy(socket, privacy);
  });
  // Handler for updating the words of specific lobby
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
  // Handler for storing the word user is going to draw
  socket.on("selected-word", (word) => {
    games.setWord(socket.lobbyId, socket, word);
  });
  // Handler for clearing the drawing for those in the lobby
  socket.on("clear-canvas", () => {
    games.clearDrawing(socket.lobbyId, socket);
  });
  // Handler for undoing the most recent action
  socket.on("undo-move", () => {
    games.undoDrawing(socket.lobbyId, socket);
  });
  // Handler for filling in the region specified with floodfill
  socket.on("fill-canvas", (drawing) => {
    games.fillCanvas(socket.lobbyId, socket, drawing);
  });
  // Handler for playing again at the end of the round
  socket.on("play-again", () => {
    games.playAgain(socket.lobbyId, socket);
  });
  // Handler for kicking a player out of a lobby
  socket.on("kick-player", (player) => {
    games.kickPlayer(socket, player);
  });
  // Handler for leaving a current session by using back arrow on Chrome
  socket.on("leave-session", () => {
    games.removePlayer(socket);
  });
});

export default app;
