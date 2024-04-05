import Round from "./Round.js";
import {
  fetchUserProfilePicture,
  updateUserPoints,
} from "../models/Database.js";
import words from "./Words.js";
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
    this.words = words;
    /**
     * List of custom words
     */
    this.customWords = "";
    /**
     * Visibility of the lobby
     */
    this.privacy = "private";
    /**
     * Icon associated to the lobby and host
     */
    this.icon = "";
    /**
     * Flag to determine if end of user's turn and display new word
     */
    this.revealWord = false;
  }
  /**
   * Add player to session
   * @param {object} socket
   * @param {string} username
   */
  async addPlayer(socket, username) {
    try {
      // Check if user is already in the lobby
      const indexPlayer = this.players.findIndex(
        (player) => player.username === username
      );
      if (indexPlayer !== -1) {
        // Update their information if the user is rejoining from another device
        if (this.host && this.host.username === username) {
          this.host = socket;
        }
        if (this.round) {
          this.round.updateUserSocket(socket, username);
        }
        // Kick the old lobby device out
        this.players[indexPlayer].socket.emit(
          "kicked",
          "You have joined from another device!"
        );
        this.players[indexPlayer].socket = socket;
      } else {
        // Add the user's information into their Object
        const icon = await fetchUserProfilePicture(username);
        const info = { socket, username, points: 0, icon };
        this.players.push(info);
        if (this.round) {
          this.round.addPlayer(info);
        }
        if (!this.host) {
          this.host = socket;
          this.icon = icon;
        }
      }
    } catch (error) {
      console.error("Unable to add player to the lobby");
    }
  }
  /**
   * Remove player from session
   * @param {string} socketId
   */
  async removePlayer(socketId) {
    // Remove player from the list of players
    const locatedPlayer = this.players.find(
      (user) => socketId === user.socket.id
    );
    // Update their points
    await this.updateIndividualPoints(locatedPlayer);

    if (this.round) {
      if (this.round.getCurrentDrawer().username === locatedPlayer.username) {
        this.timer = 5;
      }
      this.round.removePlayer(locatedPlayer.socket.id);
    }
    this.players = this.players.filter(
      (player) => player.socket.id !== socketId
    );
    // Check if the host needs to be re-assigned
    if (this.host.id === socketId && this.players.length > 0) {
      this.host = this.players[0].socket;
      this.icon = this.players[0].icon;
      this.io.to(this.id).emit("set-host", this.players[0].username);
    }
  }
  /**
   * Output who is in the current session
   * @returns {Array} returns list of players in session
   */
  getPlayerList() {
    // Output list of players via their username
    return this.players.map((player) => player.username);
  }
  /**
   * Get the player, profile picture and points of every user in the lobby
   * @returns {object[]} List of all the information for each user (points, name and profile picture)
   */
  async getPlayerAndPoints() {
    const players = [];
    for (const player of this.players) {
      players.push({
        username: player.username,
        points: player.points,
        profilePicture: player.icon,
      });
    }
    return players;
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
  /**
   * Clear drawing history
   */
  clearDrawing() {
    this.drawingHistory = [];
  }
  /**
   * Undo most recent drawing action
   */
  undoDrawing() {
    const index = this.lastMoveIndex();
    if (index !== -1) {
      this.drawingHistory = this.drawingHistory.slice(0, index);
      this.io.to(this.id).emit("undo-move", this.getDrawing());
    }
  }
  /**
   * Find last replaceable drawing action
   * @returns {number} Last time the user did an action that is undo-able
   */
  lastMoveIndex() {
    for (let i = this.drawingHistory.length - 1; i >= 0; i--) {
      if (this.drawingHistory[i].type === "move") {
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
      // Emit all drawing information, timers, selected word
      socket.emit("set-state", "drawing");
      socket.emit("initial-drawings", this.getDrawing());
      socket.emit(
        "currently-drawing",
        this.round.getCurrentDrawer().socket.username
      );
      socket.emit("new-round", this.roundCount + 1);
      socket.emit("late-timer", this.timer);
      if (this.isDrawing(socket)) {
        if (this.round.selectedWord) {
          socket.emit("selected-word", this.round.selectedWord);
        }
      }
    } else if (this.state === "settings") {
      // Emit all updated settings for the user
      socket.emit("set-state", "settings");
      socket.emit("set-minutes", this.selectedTimer);
      socket.emit("set-rounds", this.maxRounds);
      socket.emit("set-privacy", this.privacy);
      socket.emit("set-words", this.customWords);
    } else if (this.state === "end") {
      // Emit that the game has ended
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
    this.listCustom = this.splitCustomWords(this.customWords);
    this.words = this.words.concat(this.listCustom);
    this.state = "drawing";
    this.io.to(this.id).emit("set-state", this.state);
    // Set the timer and get the first person drawing
    this.timer = this.selectedTimer * 60 + 5;
    this.round = new Round(this.players, this.lobbyId, this.words, this.io);
    this.io
      .to(this.id)
      .emit("currently-drawing", this.round.getCurrentDrawer().socket.username);
    this.io.to(this.id).emit("new-round", this.roundCount + 1);
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
  /**
   * Update variable containing the word that is to be drawn
   * @param {string} word - Chosen word to be drawn
   */
  setWord(word) {
    this.round.setWord(word);
    this.io.to(this.id).emit("selected-word", word);
  }

  /**
   * Handle user guesses and update points as required for drawing and guessing users
   * @param {string} word - Word to be checked against drawing word
   * @param {object} socket - User's socket
   * @returns
   */
  guessWord(word, socket) {
    // Check if guess was correct and the word has not been revealed
    if (this.round.guess(word, socket) && !this.revealWord) {
      const player = this.players.find(
        (player) => player.socket.id === socket.id
      );
      if (player) {
        // Find both drawing user and guessing user to update their stored points
        const turn = Math.floor(
          this.timer * (5000 / (this.selectedTimer * 60))
        );
        player.points += turn;
        this.round.updateTurnPoints(player, turn);
        const drawingPoints = Math.floor(turn / 2);
        const drawingUser = this.players.find(
          (player) =>
            player.socket.id === this.round.getCurrentDrawer().socket.id
        );
        drawingUser.points += drawingPoints;
        this.round.updateTurnPoints(
          this.round.getCurrentDrawer(),
          drawingPoints
        );
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
        if (this.timer <= 5 && this.round && !this.revealWord) {
          // Emit word and display this alongside how each user performed
          this.io.to(this.id).emit("end-points", this.round.returnTurnPoints());
          this.io.to(this.id).emit("reveal-word", this.round.selectedWord);
          this.revealWord = true;
        }
        if (this.timer <= 0) {
          // Display chosen word in the chatbox
          clearInterval(this.timerId);
          this.revealWord = false;
          this.io.to(this.id).emit("receive-message", {
            text: `The word was ${this.round.selectedWord}`,
            username: "Server",
          });
          if (this.round) {
            if (this.round.hasNextDrawer()) {
              // If the timer is over and someone else is left to draw, then go to them
              this.resetNextDrawer();
            } else {
              // If nobody else is left to draw, delete the round and make a new Round object
              if (this.roundCount + 1 !== this.maxRounds) {
                this.nextRound();
              } else {
                this.roundCount += 1;
                this.endGame();
              }
            }
          }
        } else {
          if (this.round.allGuessedCorrect() && !this.revealWord) {
            // If everyone has guessed correctly, move to the next person
            this.timer = 6;
          }
          this.timer--;
        }
      }, 1000);
    } else {
      this.endGame();
    }
  }
  /**
   * Go to the next round, begin drawing and start timer
   */
  nextRound() {
    delete this.round;
    this.round = new Round(this.players, this.lobbyId, this.words, this.io);
    this.io
      .to(this.id)
      .emit("currently-drawing", this.round.getCurrentDrawer().socket.username);
    this.timer = this.selectedTimer * 60 + 5;
    this.io.to(this.id).emit("clear-canvas");
    this.roundCount += 1;
    this.io.to(this.id).emit("new-round", this.roundCount + 1);
    this.beginTimer();
  }

  /**
   * Go to the next drawing user and begin timer
   */
  resetNextDrawer() {
    this.round.nextDrawer();
    this.io
      .to(this.id)
      .emit("currently-drawing", this.round.getCurrentDrawer().socket.username);
    this.timer = this.selectedTimer * 60 + 5;
    this.io.to(this.id).emit("clear-canvas");
    this.beginTimer();
  }
  /**
   * Change the game state to signify the game has ended and update each users points
   */
  endGame() {
    this.updatePoints();
    this.state = "end";
    this.io.to(this.id).emit("set-state", "end");
  }
  /**
   * Update the points of EVERY user in the lobby session currently to the database
   */
  async updatePoints() {
    for (const player of this.players) {
      try {
        await updateUserPoints(player.username, player.points);
        player.points = 0;
      } catch (error) {
        console.error(
          `Error updating points for ${player.username}: ${error.message}`
        );
      }
    }
  }
  /**
   * Update the points of the individual user specified to the database
   * @param {object} player
   */
  async updateIndividualPoints(player) {
    try {
      await updateUserPoints(player.username, player.points);
      player.points = 0;
    } catch (error) {
      console.error(
        `Error updating points for ${player.username}: ${error.message}`
      );
    }
  }
  /**
   * Split custom words into an array
   * @returns {string[]} List of all the custom words inputted
   */
  splitCustomWords() {
    const arrayWords = this.customWords.split(",").map((word) => word.trim());
    return arrayWords;
  }
  /**
   * Delete the current game and round object if they exist
   */
  deleteGame() {
    clearInterval(this.timerId);
    if (this.round) delete this.round;
  }
  /**
   * Reset the game state back to the beginning to let users play again
   */
  async playAgain() {
    this.state = "settings";
    this.roundCount = 0;
    this.resetPlayerPoints();
    this.io.to(this.id).emit("set-state", "settings");
    this.io.to(this.id).emit("set-players", await this.getPlayerAndPoints());
  }
  /**
   * Reset every active user's points
   */
  resetPlayerPoints() {
    this.players.forEach((player) => {
      player.points = 0;
    });
  }
  /**
   * Kick the last player out of the game due to a lack of players
   * Avoid issues where only one person is in the active game session by themselves
   */
  async notEnoughPlayers() {
    if (this.players[0]) {
      this.players[0].socket.emit("not-enough-players");
      await this.updatePoints();
    }
  }
  /**
   * Kick this player out of the lobby and back to home page
   * @param {object} player
   */
  async kickPlayer(player) {
    const locatedPlayer = this.players.find((user) => player === user.username);
    if (locatedPlayer) {
      await this.removePlayer(locatedPlayer.socket.id);
      locatedPlayer.socket.emit("kicked", "You have been kicked by the host");
      this.io.to(this.id).emit("set-players", await this.getPlayerAndPoints());
    }
  }
  /**
   * Check if the username is already in the game session and being joined elsewhere
   * @param {object} socket - Socket of chosen user
   * @param {string} username - Username of chosen user
   * @returns
   */
  activePlayer(socket, username) {
    return this.players.some(
      (user) => user.username === username && user.socket.id === socket.id
    );
  }
}

export default Game;
