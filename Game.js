class Game {
  constructor(lobbyId, io) {
    this.players = [];
    this.host = null;
    this.maxRounds = 0;
    this.selectedTimer = 0;
    this.timer = 60;
    this.id = lobbyId;
    this.io = io;
    this.drawing;
    this.drawingHistory = [];
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
}

export default Game;
