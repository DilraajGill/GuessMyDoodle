class Round {
  constructor(players, lobbyId, words) {
    this.drawingIndex;
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
  initialise() {
    this.drawingIndex = 0;
    this.players[this.drawingIndex].hasDrawn = true;
    this.getCurrentDrawer().socket.emit("drawing-permitted");
  }
  getCurrentDrawer() {
    return this.players[this.drawingIndex];
  }
  hasNextDrawer() {
    return this.players.some((player) => !player.hasDrawn);
  }
  setWord(word) {
    this.selectedWord = word;
  }
  guess(word, selectedUser) {
    if (word === this.selectedWord) {
      selectedUser.hasGuessedCorrectly = true;
      return true;
    }
  }
  allGuessedCorrect() {
    return this.players.every(
      (player) =>
        player.hasGuessedCorrectly || player === this.getCurrentDrawer()
    );
  }
  resetGuesses() {
    this.players.forEach((player) => {
      player.hasGuessedCorrectly = false;
    });
  }
  checkDrawing(socket) {
    return this.getCurrentDrawer().socket === socket;
  }
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
