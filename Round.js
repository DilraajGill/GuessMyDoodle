class Round {
  constructor(players, lobbyId, words) {
    this.drawingIndex;
    this.players = players;
    this.words = words;
    this.selectedWord;
    this.lobbyId = lobbyId;
  }
}

export default Round;
