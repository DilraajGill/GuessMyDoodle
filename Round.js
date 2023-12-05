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
}

export default Round;
