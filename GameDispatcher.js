import Game from "./Game.js";

/**
 * Dispatch requests to the appropriate Game object
 */
class GameDispatcher {
  /**
   * Initialise all attributes
   * @param {object} io - Used to receive socket communication
   */
  constructor(io) {
    // Initialise attributes
    /**
     * Object storing list of active Games
     */
    this.games = {};
    /**
     * Storing all socket communication for easy access
     */
    this.io = io;
  }
  /**
   * Check if a LobbyID is currently active
   * @param {string} lobbyId - LobbyID of session
   * @returns {boolean} returns true if exists
   */
  checkExists(lobbyId) {
    // Check if the lobby of that ID exists
    return !!this.games[lobbyId];
  }
  /**
   * Remove a lobby from the object storing games
   * @param {string} lobbyId - LobbyID of session
   * @returns {boolean} returns true if removed
   */
  remove(lobbyId) {
    // Remove the lobby from object storing the list of them
    if (this.checkExists(lobbyId)) {
      delete this.games[lobbyId];
      return true;
    }
    return false;
  }
  /**
   * Create a new lobby of random ID
   * @returns {string} returns string of generated lobby
   */
  create() {
    // Create a new Game object of random lobby id
    const generatedID = this.generateLobbyID();
    while (this.checkExists(generatedID)) {
      generatedID = this.generateLobbyID();
    }
    this.games[generatedID] = new Game(generatedID, this.io);
    return generatedID;
  }
  // Generate a lobbyID from random characters of length 5 characters
  /**
   * Used alongside create method to return characters of ID
   * @returns {string} returns string of length 5 to be unique ID
   */
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
  /**
   * Join the session of specific ID
   * @param {string} lobbyId - LobbyID of session
   * @param {object} socket - Socket to be used for communication
   * @param {string} username - Username of the user joining lobby
   */
  async joinGame(lobbyId, socket, username) {
    if (this.checkExists(lobbyId)) {
      socket.username = username;
      socket.lobbyId = lobbyId;
      socket.points = 0;
      socket.join(lobbyId);
      await this.games[lobbyId].addPlayer(socket, username);
      console.log(`Added ${username} to the lobby`);
      this.io
        .to(lobbyId)
        .emit("set-players", await this.games[lobbyId].getPlayerAndPoints());
      this.games[lobbyId].initialiseState(socket);
    } else {
      socket.emit("invalid-game");
    }
  }
  // Message everyone else in the game session
  /**
   * Message all other users in the game
   * @param {string} lobbyId - ID of the lobby to be transmitted to
   * @param {string} text - Message to be sent
   * @param {string} username - Username sending the message
   */
  async messageGame(lobbyId, text, socket) {
    if (this.checkExists(lobbyId)) {
      if (this.games[lobbyId].guessWord(text, socket)) {
        this.io.to(lobbyId).emit("receive-message", {
          text: `${socket.username} has guessed correctly!`,
          username: "Server",
        });
        this.io
          .to(lobbyId)
          .emit("set-players", await this.games[lobbyId].getPlayerAndPoints());
      } else {
        if (!this.games[lobbyId].isDrawing(socket)) {
          this.io
            .to(lobbyId)
            .emit("receive-message", { text, username: socket.username });
        } else {
          socket.emit("receive-message", {
            text: "You cannot message while drawing!",
            username: "Server",
          });
        }
      }
    }
  }
  // Check if the socket is host of the lobby ID
  /**
   * Check if the socket is host of the lobby
   * @param {string} lobbyId - Lobby ID of designated session
   * @param {object} socket - Socket of user to check if host
   * @returns {boolean} returns true if user is host
   */
  checkHost(lobbyId, socket) {
    return this.games[lobbyId].host === socket;
  }
  // Add drawing data and emit to the rest of the lobby
  /**
   * Add drawing to the session and emit to all
   * @param {string} lobbyId - ID of the lobby to be transmitted to
   * @param {object} socket - User trying to draw
   * @param {object} data - Data related to drawing information
   */
  addDrawing(lobbyId, socket, data) {
    if (!this.checkExists(lobbyId)) {
      socket.emit("incorrectDrawing");
    } else if (this.checkDrawing(lobbyId, socket)) {
      this.io.to(lobbyId).emit("drawing", data);
      this.games[lobbyId].addDrawing(data);
    }
  }
  // Emit to rest of the lobby that the user is drawing
  /**
   * Triggered by mouse event of user drawing to start new path
   * @param {string} lobbyId - ID of the lobby
   */
  beganDrawing(lobbyId) {
    this.io.to(lobbyId).emit("beginDrawing");
    this.games[lobbyId].addDrawing({ type: "move" });
  }
  endDrawing(lobbyId) {
    this.io.to(lobbyId).emit("endDrawing");
    this.games[lobbyId].addDrawing({ type: "end" });
  }
  // Remove a player from the lobby
  /**
   * Remove a player from a session
   * @param {object} socket - User to remove
   */
  async removePlayer(socket) {
    if (this.checkExists(socket.lobbyId)) {
      await this.games[socket.lobbyId].removePlayer(socket.id);
      const playerList = await this.games[socket.lobbyId].getPlayerAndPoints();
      this.io.to(socket.lobbyId).emit("set-players", playerList);
      if (
        (this.games[socket.lobbyId].players.length === 1 &&
          this.games[socket.lobbyId].state !== "settings") ||
        this.games[socket.lobbyId].players.length === 0
      ) {
        await this.games[socket.lobbyId].notEnoughPlayers();
        this.deleteGame(socket.lobbyId);
      }
    }
  }
  // Update the number of minutes a user has to draw
  /**
   * Update the number of minutes to draw
   * @param {object} socket - User trying to update
   * @param {number} minutes - Number of minutes
   */
  updateMinutes(socket, minutes) {
    if (this.checkExists(socket.lobbyId)) {
      if (this.checkHost(socket.lobbyId, socket)) {
        this.io.to(socket.lobbyId).emit("set-minutes", minutes);
        this.games[socket.lobbyId].setMinutes(minutes);
      }
    }
  }
  // Update teh number of rounds that will be played
  /**
   * Update the number of rounds to play
   * @param {object} socket - User trying to update
   * @param {number} rounds - Number of rounds
   */
  updateRounds(socket, rounds) {
    if (this.checkExists(socket.lobbyId)) {
      if (this.checkHost(socket.lobbyId, socket)) {
        this.io.to(socket.lobbyId).emit("set-rounds", rounds);
        this.games[socket.lobbyId].setRounds(rounds);
      }
    }
  }
  updatePrivacy(socket, privacy) {
    if (this.checkExists(socket.lobbyId)) {
      if (this.checkHost(socket.lobbyId, socket)) {
        this.io.to(socket.lobbyId).emit("set-privacy", privacy);
        this.games[socket.lobbyId].setPrivacy(privacy);
      }
    }
  }
  updateWords(socket, words) {
    if (this.checkExists(socket.lobbyId)) {
      if (this.checkHost(socket.lobbyId, socket)) {
        this.io.to(socket.lobbyId).emit("set-words", words);
        this.games[socket.lobbyId].setWords(words);
      }
    }
  }
  // Start the game after checking if user has permissions
  /**
   * Start the game after checking permissions
   * @param {object} socket - Socket trying to initiate
   */
  startGame(socket) {
    if (this.checkExists(socket.lobbyId)) {
      if (this.checkHost(socket.lobbyId, socket)) {
        this.games[socket.lobbyId].start();
      }
    }
  }
  // If a user joins late, it will emit the information they have missed
  /**
   * Initialise drawings for any users who join late
   * @param {object} socket - Socket to emit information to
   */
  initialiseDrawings(socket) {
    if (this.checkExists(socket.lobbyId)) {
      this.games[socket.lobbyId].initialiseState(socket);
    }
  }
  // Check if the user is able to begin drawing
  /**
   * Check if the user is allowed to draw
   * @param {string} lobbyId - Lobby to check
   * @param {object} socket - Socket of user trying to draw
   * @returns {boolean} returns true if user is allowed to draw
   */
  checkDrawing(lobbyId, socket) {
    return this.games[lobbyId].isDrawing(socket);
  }
  setWord(lobbyId, socket, word) {
    if (this.checkExists(lobbyId)) {
      if (this.checkDrawing(lobbyId, socket)) {
        this.games[lobbyId].setWord(word);
      }
    }
  }
  getPublic() {
    const publicGames = [];
    for (const lobbyId in this.games) {
      const game = this.games[lobbyId];
      if (game && game.privacy === "public" && game.state !== "end") {
        publicGames.push({
          id: game.id,
          host: game.host.username,
          playerCount: game.players.length,
          icon: game.icon,
        });
      }
    }
    return publicGames;
  }
  clearDrawing(lobbyId, socket) {
    if (this.checkExists(lobbyId)) {
      if (this.checkDrawing(lobbyId, socket)) {
        this.io.to(lobbyId).emit("clear-canvas");
        this.games[lobbyId].clearDrawing();
      }
    }
  }
  undoDrawing(lobbyId, socket) {
    if (this.checkExists(lobbyId)) {
      if (this.checkDrawing(lobbyId, socket)) {
        this.games[lobbyId].undoDrawing();
      }
    }
  }
  fillCanvas(lobbyId, socket, drawing) {
    if (this.checkExists(lobbyId)) {
      if (this.checkDrawing(lobbyId, socket)) {
        this.games[lobbyId].addDrawing(drawing);
        this.io.to(lobbyId).emit("fill-canvas", drawing);
      }
    }
  }
  deleteGame(lobbyId) {
    this.games[lobbyId].deleteGame();
    delete this.games[lobbyId];
    this.remove(lobbyId);
  }
  async playAgain(lobbyId, socket) {
    if (this.checkExists(lobbyId)) {
      if (this.checkHost(lobbyId, socket)) {
        await this.games[lobbyId].playAgain();
      }
    }
  }
}

export default GameDispatcher;
