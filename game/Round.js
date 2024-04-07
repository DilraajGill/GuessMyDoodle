/**
 * Represent a round within the game
 */
class Round {
  /**
   *
   * @param {Object[]} players - An array of player objects
   * @param {string} lobbyId - The ID of the lobby
   * @param {string[]} words - List of words to be used in the round
   */
  constructor(players, lobbyId, words, io) {
    // Initialise attributes
    /**
     * Index of user who is currently drawing
     */
    this.drawingIndex;
    // Store list of players, with attributes such as hasDrawn and hasGuessedCorrectly to track
    /**
     * List of all players within the lobby and flags such as hasDrawn and hasGuessedCorrectly
     */
    this.players = players.map((player) => ({
      ...player,
      hasDrawn: false,
      hasGuessedCorrectly: false,
      turnPoints: 0,
    }));
    /**
     * List of all possible words
     */
    this.words = words;
    /**
     * Store the selected word of the user
     */
    this.selectedWord;
    /**
     * Store the lobby ID of the respective game session
     */
    this.lobbyId = lobbyId;
    this.io = io;
    /**
     * Initialise the lobby
     */
    this.initialise();
  }
  // Initialise the round and begin interaction
  /**
   * Initialise gameplay and begin the session via selecting first person to draw
   */
  initialise() {
    this.drawingIndex = 0;
    this.players[this.drawingIndex].hasDrawn = true;
    this.getCurrentDrawer().socket.emit("drawing-permitted");
    let choices = this.getRandomWords();
    this.getCurrentDrawer().socket.emit("choose-words", choices);
  }
  // Check who is currently drawing
  /**
   * Get the player who is currently drawing
   * @returns {Object} Person currently drawing
   */
  getCurrentDrawer() {
    return this.players[this.drawingIndex];
  }
  // Check if another drawer is available
  /**
   * Check if another drawer is available
   * @returns {boolean} returns true if there are more players remaining
   */
  hasNextDrawer() {
    return this.players.some((player) => !player.hasDrawn);
  }
  // Set the word to the selected word
  /**
   * Store the word that the person drawing has chosen
   * @param {string} word - The user's word of choice to draw
   */
  setWord(word) {
    this.selectedWord = word;
  }
  // Used to check if the user's guess is the same as the one being drawn

  /**
   * Check if the user's guess is correct to that of the word being drawn
   * @param {string} word - The player's guessed word
   * @param {Object} socket - The player's socket who has made the guess
   * @returns {boolean} returns true if the guess is correct
   */
  guess(word, socket) {
    if (
      this.selectedWord &&
      word.toLowerCase() === this.selectedWord.toLowerCase()
    ) {
      const player = this.players.find((user) => user.socket === socket);
      if (
        !player.hasGuessedCorrectly &&
        !(player === this.getCurrentDrawer())
      ) {
        player.hasGuessedCorrectly = true;
        return true;
      }
    }
    return false;
  }
  // Check if everyone in the list has guessed correctly or is currently drawing
  /**
   * Check if everyone in the lobby has guessed the word correctly (or currently drawing)
   * @returns {boolean} returns true if everyone has guessed correctly
   */
  allGuessedCorrect() {
    return this.players.every(
      (player) =>
        player.hasGuessedCorrectly || player === this.getCurrentDrawer()
    );
  }
  // Reset the flag for guessed correctly
  /**
   * Reset the flag of each player in the list of players when changing to next user's turn
   */
  resetGuesses() {
    this.players.forEach((player) => {
      player.hasGuessedCorrectly = false;
    });
  }
  // Check if the user is allowed to be drawing
  /**
   * Check if the socket is given permission to draw
   * @param {Object} socket - The socket being compared
   * @returns {boolean} returns true if the user is allowed to draw
   */
  checkDrawing(socket) {
    return this.getCurrentDrawer().socket === socket;
  }
  // Adjust who is drawing to the next person
  /**
   * Go to the next player's turn
   */
  nextDrawer() {
    this.selectedWord = "";
    this.drawingIndex += 1;
    this.players[this.drawingIndex].hasDrawn = true;
    this.resetGuesses();
    let choices = this.getRandomWords();
    this.getCurrentDrawer().socket.emit("choose-words", choices);
    setTimeout(() => {
      if (!this.selectedWord) {
        this.setWord(choices[0]);
        this.io.to(this.id).emit("selected-word", choices[0]);
      }
    });
  }
  /**
   * Retrieve 3 items from the list of words and custom words to be sent to the user
   * @returns {string[]} 3 words that the user can select to draw
   */
  getRandomWords() {
    const result = [];
    while (result.length < 3) {
      let index = Math.floor(Math.random() * this.words.length);
      if (!result.includes(this.words[index])) {
        result.push(this.words[index]);
      }
    }
    return result;
  }

  /**
   * Obtain each users points from that turn and reset them all
   * @returns {object[]} List of all users who gained points that round
   */
  returnTurnPoints() {
    const points = this.players
      .filter((player) => player.turnPoints > 0)
      .map((player) => ({
        username: player.socket.username,
        value: player.turnPoints,
      }))
      .sort((a, b) => b.turnPoints - a.turnPoints);

    this.players.forEach((player) => {
      player.turnPoints = 0;
    });

    return points;
  }
  /**
   * Update the user's turn points when they guess correctly
   * @param {object} user - Account that made the correct guess
   * @param {number} points - The value to set their new Turn Points to
   */
  updateTurnPoints(user, points) {
    const foundPlayer = this.players.find(
      (player) => player.socket.id === user.socket.id
    );
    if (foundPlayer) {
      foundPlayer.turnPoints = points;
    } else {
      console.log(`Cannot find player ${user}`);
    }
  }

  /**
   * Remove the player from the round
   * @param {object} socketId - Socket ID of the user
   */
  removePlayer(socketId) {
    const index = this.players.findIndex(
      (player) => player.socket.id === socketId
    );
    if (index >= 0) {
      const user = this.players[index];
      if (user && user.hasDrawn) {
        this.drawingIndex -= 1;
      }
      this.players = this.players.filter(
        (player) => player.socket.id !== socketId
      );
    } else {
      console.log("Cannot find user");
    }
  }
  /**
   * Add the player to the round
   * @param {object} player - User and their information
   */
  addPlayer(player) {
    this.players.push({
      ...player,
      hasDrawn: false,
      hasGuessedCorrectly: false,
      turnPoints: 0,
    });
  }
  /**
   * Update the socket to show they have rejoined from another location
   * @param {object} socket
   * @param {string} username
   */
  updateUserSocket(socket, username) {
    const indexPlayer = this.players.findIndex(
      (player) => player.username === username
    );
    if (indexPlayer !== -1) {
      this.players[indexPlayer].socket = socket;
    }
  }
}

export default Round;
