import Game from "./Game.js";

class GameDispatcher {
  constructor(io) {
    // Initialise attributes
    this.games = {};
    this.io = io;
  }
  checkExists(lobbyId) {
    // Check if the lobby of that ID exists
    return !!this.games[lobbyId];
  }
  remove(lobbyId) {
    // Remove the lobby from object storing the list of them
    if (this.checkExists(lobbyId)) {
      delete this.games[lobbyId];
      return true;
    }
    return false;
  }
  create() {
    // Create a new Game object of random lobby id
    const generatedID = this.generateLobbyID();
    while (this.checkExists(generatedID)) {
      generatedID = this.generateLobbyID();
    }
    this.games[generatedID] = new Game(generatedID, this.io);
    console.log(this.games);
    return generatedID;
  }
  // Generate a lobbyID from random characters of length 5 characters
  generateLobbyID() {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let output = "";
    for (let x = 0; x < 5; x++) {
      output += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return output;
  }
  // Join a game session with checks if the lobby exists
  joinGame(lobbyId, socket, username) {
    if (this.checkExists(lobbyId)) {
      socket.username = username;
      socket.lobbyId = lobbyId;
      socket.points = 0;
      socket.join(lobbyId);
      this.games[lobbyId].addPlayer(socket, username);
      console.log(`Added ${username} to the lobby`);
      this.io
        .to(lobbyId)
        .emit("set-players", this.games[lobbyId].getPlayerList());
      this.games[lobbyId].initialiseState(socket);
    } else {
      socket.emit("invalid-game");
    }
  }
  // Message everyone else in the game session
  messageGame(lobbyId, text, username) {
    if (this.checkExists(lobbyId)) {
      this.io.to(lobbyId).emit("receive-message", { text, username });
    }
  }
  // Check if the socket is host of the lobby ID
  checkHost(lobbyId, socket) {
    return this.games[lobbyId].host === socket;
  }
  // Add drawing data and emit to the rest of the lobby
  addDrawing(lobbyId, socket, data) {
    if (!this.checkExists(lobbyId)) {
      socket.emit("incorrectDrawing");
    } else if (this.checkDrawing(lobbyId, socket)) {
      this.io.to(lobbyId).emit("drawing", data);
      this.games[lobbyId].addDrawing(data);
    }
  }
  // Emit to rest of the lobby that the user is drawing
  beganDrawing(lobbyId) {
    this.io.to(lobbyId).emit("beginDrawing");
    this.games[lobbyId].addDrawing({ type: "move" });
  }
  // Remove a player from the lobby
  removePlayer(socket) {
    if (this.checkExists(socket.lobbyId)) {
      this.games[socket.lobbyId].removePlayer(socket.id);
      this.io
        .to(socket.lobbyId)
        .emit("set-players", this.games[socket.lobbyId].getPlayerList());
    }
  }
  // Update the number of minutes a user has to draw
  updateMinutes(socket, minutes) {
    if (this.checkExists(socket.lobbyId)) {
      if (this.checkHost(socket.lobbyId, socket)) {
        this.io.to(socket.lobbyId).emit("set-minutes", minutes);
        this.games[socket.lobbyId].setMinutes(minutes);
      }
    }
  }
  // Update teh number of rounds that will be played
  updateRounds(socket, rounds) {
    if (this.checkExists(socket.lobbyId)) {
      if (this.checkHost(socket.lobbyId, socket)) {
        this.io.to(socket.lobbyId).emit("set-rounds", rounds);
        this.games[socket.lobbyId].setRounds(rounds);
      }
    }
  }
  // Start the game after checking if user has permissions
  startGame(socket) {
    if (this.checkExists(socket.lobbyId)) {
      if (this.checkHost(socket.lobbyId, socket)) {
        this.games[socket.lobbyId].start();
      }
    }
  }
  // If a user joins late, it will emit the information they have missed
  initialiseDrawings(socket) {
    if (this.checkExists(socket.lobbyId)) {
      this.games[socket.lobbyId].initialiseState(socket);
    }
  }
  // Check if the user is able to begin drawing
  checkDrawing(lobbyId, socket) {
    return this.games[lobbyId].isDrawing(socket);
  }
}

export default GameDispatcher;
