import Round from "./Round.js";
import { updateUserPoints } from "./Database.js";
/**
 * Represent a game session
 */
class Game {
  /**
   *
   * @param {string} lobbyId
   * @param {object} io
   */
  constructor(lobbyId, io) {
    // Initialise attributes
    /**
     * Array of players in the session
     */
    this.players = [];
    /**
     * Store the host user
     */
    this.host = null;
    /**
     * The number of rounds to play
     */
    this.maxRounds = 1;
    /**
     * The amount of time to be played (in minutes)
     */
    this.selectedTimer = 1;
    /**
     * The amount of time to be played (in seconds)
     */
    this.timer = 60;
    /**
     * ID of specific session
     */
    this.id = lobbyId;
    /**
     * IO for socket communication
     */
    this.io = io;
    /**
     * Track who is drawing
     */
    this.drawing;
    /**
     * Drawing history to update late users
     */
    this.drawingHistory = [];
    /**
     * Number of rounds elapsed
     */
    this.roundCount = 0;
    /**
     * State of the round
     * @example "drawing"
     */
    this.state = "settings";
    /**
     * Potential words to select
     */
    this.words = ["dilraaj", "gill", "hello"];
    this.customWords = "";
    this.privacy = "private";
  }
  /**
   * Add player to session
   * @param {object} socket
   * @param {string} username
   */
  addPlayer(socket, username) {
    // Add user to list of players and if first player, it will become the host too
    this.players.push({ socket, username, points: 0 });
    if (!this.host) {
      this.host = socket;
      this.drawing = socket;
    }
  }
  /**
   * Remove player from session
   * @param {string} socketId
   */
  removePlayer(socketId) {
    // Remove player from the list of players
    this.players = this.players.filter(
      (player) => player.socket.id !== socketId
    );
  }
  /**
   * Output who is in the current session
   * @returns {Array} returns list of players in session
   */
  getPlayerList() {
    // Output list of players via their username
    return this.players.map((player) => player.username);
  }
  getPlayerAndPoints() {
    return this.players.map((player) => ({
      username: player.username,
      points: player.points,
    }));
  }
  /**
   * Check if the socket is the host of lobby / game
   * @param {object} socket - Socket to compare
   * @returns {boolean} returns true if user is host
   */
  isHost(socket) {
    // Check if the socket is the host of lobby / game
    return this.host === socket;
  }
  /**
   * Store drawing data for late users
   * @param {object} data - Drawing data
   */
  addDrawing(data) {
    // Store drawing data to render for those joining late
    this.drawingHistory.push(data);
  }
  clearDrawing() {
    this.drawingHistory = [];
  }
  undoDrawing() {
    const index = this.lastMoveIndex();
    if (index !== -1) {
      this.drawingHistory = this.drawingHistory.slice(0, index);
      this.io.to(this.id).emit("undo-move", this.getDrawing());
    }
  }
  lastMoveIndex() {
    for (let i = this.drawingHistory.length - 1; i >= 0; i--) {
      if (this.drawingHistory[i].type === "move") {
        console.log(`Found undo point ${i}`);
        return i;
      }
    }
  }
  /**
   * If someone joins late, they are caught up to speed
   * @returns {object} returns drawing history
   */
  getDrawing() {
    // Return drawing history
    return this.drawingHistory;
  }
  /**
   * Initialise with progression that has been made
   * @param {object} socket - Socket to update
   */
  initialiseState(socket) {
    // Initialise the state of the lobby for those joining
    socket.emit("set-host", this.host.username);
    if (this.state === "drawing") {
      socket.emit("set-state", "drawing");
      socket.emit("initial-drawings", this.getDrawing());
      socket.emit(
        "currently-drawing",
        this.round.getCurrentDrawer().socket.username
      );
      socket.emit("new-round", this.roundCount + 1);
      socket.emit("late-timer", this.timer);
    } else if (this.state === "settings") {
      socket.emit("set-state", "settings");
      socket.emit("set-minutes", this.selectedTimer);
      socket.emit("set-rounds", this.maxRounds);
      socket.emit("set-privacy", this.privacy);
      socket.emit("set-words", this.customWords);
    } else if (this.state === "end") {
      socket.emit("set-state", "end");
    }
  }
  /**
   * Adjust how long each user has to draw
   * @param {number} minutes - Number of minutes
   */
  setMinutes(minutes) {
    // Adjust the number of minutes a user has to draw
    this.selectedTimer = minutes;
  }
  /**
   * Adjust how many rounds to be played
   * @param {number} rounds
   */
  setRounds(rounds) {
    // Adjust the number of rounds to be played
    this.maxRounds = rounds;
  }
  setPrivacy(privacy) {
    this.privacy = privacy;
  }
  setWords(words) {
    this.customWords = words;
  }
  /**
   * Start the game and begin timer
   */
  start() {
    // Start the lobby and adjust state
    this.customWords = this.splitCustomWords(this.customWords);
    this.words = this.words.concat(this.customWords);
    this.state = "drawing";
    this.io.to(this.id).emit("set-state", this.state);
    this.timer = this.selectedTimer * 60;
    this.round = new Round(this.players, this.lobbyId, this.words);
    this.io
      .to(this.id)
      .emit("currently-drawing", this.round.getCurrentDrawer().socket.username);
    this.io.to(this.id).emit("new-round");
    this.beginTimer();
  }
  /**
   * Check if the user is allowed to draw
   * @param {object} socket - Socket to check
   * @returns {boolean} returns true if the socket is allowed to draw
   */
  isDrawing(socket) {
    // Check if the socket is the one allowed access to draw
    return this.round.checkDrawing(socket);
  }
  setWord(word) {
    this.round.setWord(word);
  }

  guessWord(word, socket) {
    if (this.round.guess(word, socket)) {
      const player = this.players.find(
        (player) => player.socket.id === socket.id
      );
      if (player) {
        player.points += this.timer * (5000 / (this.selectedTimer * 60));
        console.log(`${player.username} now has ${player.points} points!`);
        return true;
      }
    }
    return false;
  }
  /**
   * Begin timer necessary for game functionality
   */
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
              this.io
                .to(this.id)
                .emit(
                  "currently-drawing",
                  this.round.getCurrentDrawer().socket.username
                );
              this.timer = this.selectedTimer * 60;
              this.beginTimer();
            } else {
              // If nobody else is left to draw, delete the round and make a new Round object
              delete this.round;
              this.round = new Round(this.players, this.lobbyId, this.words);
              this.io
                .to(this.id)
                .emit(
                  "currently-drawing",
                  this.round.getCurrentDrawer().socket.username
                );
              this.timer = this.selectedTimer * 60;
              this.roundCount += 1;
              this.io.to(this.id).emit("new-round", this.roundCount + 1);
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
    } else {
      this.updatePoints();
      this.io.to(this.id).emit("set-state", "end");
    }
  }
  async updatePoints() {
    for (const player of this.players) {
      try {
        await updateUserPoints(player.username, player.points);
        console.log(`Updated points for ${player.username}`);
        player.points = 0;
      } catch (error) {
        console.error(
          `Error updating points for ${player.username}: ${error.message}`
        );
      }
    }
  }
  splitCustomWords() {
    const arrayWords = this.customWords.split(",").map((word) => word.trim());
    return arrayWords;
  }
  deleteGame() {
    clearInterval(this.timerId);
    if (this.round) delete this.round;
  }
}

export default Game;
