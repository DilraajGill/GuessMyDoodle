import Round from "./Round.js";
class Game {
  constructor(lobbyId, io) {
    this.players = [];
    this.host = null;
    this.maxRounds = 1;
    this.selectedTimer = 1;
    this.timer = 60;
    this.id = lobbyId;
    this.io = io;
    this.drawing;
    this.drawingHistory = [];
    this.roundCount = 0;
    this.state = "settings";
    this.words = ["dilraaj", "gill", "hello"];
  }
  addPlayer(socket, username) {
    this.players.push({ socket, username });
    if (!this.host) {
      this.host = socket;
      this.drawing = socket;
    }
  }
  removePlayer(socketId) {
    this.players = this.players.filter(
      (player) => player.socket.id !== socketId
    );
  }
  getPlayerList() {
    return this.players.map((player) => player.username);
  }
  isHost(socket) {
    return this.host === socket;
  }
  addDrawing(data) {
    this.drawingHistory.push(data);
  }
  getDrawing() {
    return this.drawingHistory;
  }
  initialiseState(socket) {
    if (this.state === "drawing") {
      socket.emit("set-state", "drawing");
      socket.emit("initial-drawings", this.getDrawing());
    } else if (this.state === "settings") {
      socket.emit("set-state", "settings");
      socket.emit("set-minutes", this.selectedTimer);
      socket.emit("set-rounds", this.maxRounds);
    }
  }
  setMinutes(minutes) {
    this.selectedTimer = minutes;
  }
  setRounds(rounds) {
    this.maxRounds = rounds;
  }
  start() {
    this.state = "drawing";
    this.io.to(this.id).emit("set-state", this.state);
    this.timer = this.selectedTimer * 60;
    this.round = new Round(this.players, this.lobbyId, this.words);
    this.beginTimer();
  }
  isDrawing(socket) {
    return this.round.checkDrawing(socket);
  }
  beginTimer() {
    if (this.roundCount < this.maxRounds) {
      this.timerId = setInterval(() => {
        if (this.timer <= 0) {
          clearInterval(this.timerId);
          if (this.round) {
            if (this.round.hasNextDrawer()) {
              console.log("Going to next player");
              this.round.nextDrawer();
              this.timer = this.selectedTimer * 60;
              this.beginTimer();
            } else {
              delete this.round;
              console.log("Next Round");
              this.round = new Round(this.players, this.lobbyId, this.words);
              this.timer = this.selectedTimer * 60;
              this.roundCount += 1;
              this.beginTimer();
            }
          }
        } else {
          if (this.round.allGuessedCorrect()) {
            this.timer = 0;
          }
          this.timer--;
        }
      }, 1000);
    }
  }
}

export default Game;
