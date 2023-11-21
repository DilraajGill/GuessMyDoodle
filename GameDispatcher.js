import Game from "./Game";

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
}

export default GameDispatcher;
