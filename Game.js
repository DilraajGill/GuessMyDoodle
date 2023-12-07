import Round from "./Round.js";
class Game {
  constructor(lobbyId, io) {
    // Initialise attributes
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
    // Add user to list of players and if first player, it will become the host too
    this.players.push({ socket, username });
    if (!this.host) {
      this.host = socket;
      this.drawing = socket;
    }
  }
  removePlayer(socketId) {
    // Remove player from the list of players
    this.players = this.players.filter(
      (player) => player.socket.id !== socketId
    );
  }
  getPlayerList() {
    // Output list of players via their username
    return this.players.map((player) => player.username);
  }
  isHost(socket) {
    // Check if the socket is the host of lobby / game
    return this.host === socket;
  }
  addDrawing(data) {
    // Store drawing data to render for those joining late
    this.drawingHistory.push(data);
  }
  getDrawing() {
    // Return drawing history
    return this.drawingHistory;
  }
  initialiseState(socket) {
    // Initialise the state of the lobby for those joining
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
    // Adjust the number of minutes a user has to draw
    this.selectedTimer = minutes;
  }
  setRounds(rounds) {
    // Adjust the number of rounds to be played
    this.maxRounds = rounds;
  }
  start() {
    // Start the lobby and begin the timer
    this.state = "drawing";
    this.io.to(this.id).emit("set-state", this.state);
    this.timer = this.selectedTimer * 60;
    this.round = new Round(this.players, this.lobbyId, this.words);
    this.beginTimer();
  }
  isDrawing(socket) {
    // Check if the socket is the one allowed access to draw
    return this.round.checkDrawing(socket);
  }
  beginTimer() {
    // Start a timer for the user to draw within
    if (this.roundCount < this.maxRounds) {
      this.timerId = setInterval(() => {
        if (this.timer <= 0) {
          clearInterval(this.timerId);
          if (this.round) {
            if (this.round.hasNextDrawer()) {
              // If the timer is over and someone else is left to draw, then go to them
              console.log("Going to next player");
              this.round.nextDrawer();
              this.timer = this.selectedTimer * 60;
              this.beginTimer();
            } else {
              // If nobody else is left to draw, delete the round and make a new Round object
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
            // If everyone has guessed correctly, move to the next person
            this.timer = 0;
          }
          this.timer--;
        }
      }, 1000);
    }
  }
}

export default Game;
