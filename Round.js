class Round {
  constructor(players, lobbyId, words) {
    // Initialise attributes
    this.drawingIndex;
    // Store list of players, with attributes such as hasDrawn and hasGuessedCorrectly to track
    this.players = players.map((player) => ({
      ...player,
      hasDrawn: false,
      hasGuessedCorrectly: false,
    }));
    this.words = words;
    this.selectedWord;
    this.lobbyId = lobbyId;
    this.initialise();
  }
  // Initialise the round and begin interaction
  initialise() {
    this.drawingIndex = 0;
    this.players[this.drawingIndex].hasDrawn = true;
    this.getCurrentDrawer().socket.emit("drawing-permitted");
  }
  // Check who is currently drawing
  getCurrentDrawer() {
    return this.players[this.drawingIndex];
  }
  // Check if another drawer is available
  hasNextDrawer() {
    return this.players.some((player) => !player.hasDrawn);
  }
  // Set the word to the selected word
  setWord(word) {
    this.selectedWord = word;
  }
  // Used to check if the user's guess is the same as the one being drawn
  guess(word, selectedUser) {
    if (word === this.selectedWord) {
      selectedUser.hasGuessedCorrectly = true;
      return true;
    }
  }
  // Check if everyone in the list has guessed correctly or is currently drawing
  allGuessedCorrect() {
    return this.players.every(
      (player) =>
        player.hasGuessedCorrectly || player === this.getCurrentDrawer()
    );
  }
  // Reset the flag for guessed correctly
  resetGuesses() {
    this.players.forEach((player) => {
      player.hasGuessedCorrectly = false;
    });
  }
  // Check if the user is allowed to be drawing
  checkDrawing(socket) {
    return this.getCurrentDrawer().socket === socket;
  }
  // Adjust who is drawing to the next person
  nextDrawer() {
    this.selectedWord = "";
    this.drawingIndex += 1;
    this.players[this.drawingIndex].hasDrawn = true;
    console.log(
      `Currently Drawing: ${this.getCurrentDrawer().socket.username}`
    );
  }
}

export default Round;
