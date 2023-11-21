import Game from "./Game.js";

class GameDispatcher {
  constructor(io) {
    this.games = {};
    this.io = io;
  }
  checkExists(lobbyId) {
    return !!this.games[lobbyId];
  }
  remove(lobbyId) {
    if (this.checkExists(lobbyId)) {
      delete this.games[lobbyId];
      return true;
    }
    return false;
  }
  create() {
    const generatedID = this.generateLobbyID();
    while (this.checkExists(generatedID)) {
      generatedID = this.generateLobbyID();
    }
    this.games[generatedID] = new Game(generatedID, this.io);
    console.log(this.games);
    return generatedID;
  }
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
  joinGame(lobbyId, socket, username) {
    if (this.checkExists(lobbyId)) {
      socket.username = username;
      socket.lobbyId = lobbyId;
      socket.points = 0;
      socket.join(lobbyId);
      this.games[lobbyId].addPlayer(socket, username);
      console.log(`Added ${username} to the lobby`);
    } else {
      socket.emit("invalid-game");
    }
  }
  messageGame(lobbyId, text, username) {
    if (this.checkExists(lobbyId)) {
      this.io.to(lobbyId).emit("receive-message", { text, username });
    }
  }
  checkHost(lobbyId, socket) {
    return this.games[lobbyId].host === socket;
  }
  addDrawing(lobbyId, socket, data) {
    if (!this.checkExists(lobbyId)) {
      socket.emit("incorrectDrawing");
    } else if (this.checkHost(lobbyId, socket)) {
      this.io.to(lobbyId).emit("drawing", data);
      this.games[lobbyId].addDrawing(data);
    }
  }
  beganDrawing(lobbyId) {
    this.io.to(lobbyId).emit("beginDrawing");
  }
}

export default GameDispatcher;
