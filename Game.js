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
    this.state = "settings";
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
  start(numberRounds, minutesOfDrawing) {
    this.maxRounds = numberRounds;
    this.selectedTimer = minutesOfDrawing * 60;
  }
  addDrawing(data) {
    this.drawingHistory.push(data);
  }
  getDrawing() {
    return this.drawingHistory;
  }
  initialiseState(socket) {
    if (this.state === "drawing") {
      socket.emit("setState", "drawing");
      socket.emit("initial-drawings", this.getDrawing());
    } else if (this.state === "settings") {
      socket.emit("setState", "settings");
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
}

export default Game;
