import express from "express";
import passport from "passport";
import session from "express-session"
import router from "./auth.js";
import { Server as SocketIo } from "socket.io";

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

// Listen on port 3001
const server = app.listen(3001);
const io = new SocketIo(server);

io.on("connection", (socket) => {
  console.log("A user has connected");
  socket.on("drawing client", (data) => {
    socket.emit("correctDrawing");
  })
})

export default app;