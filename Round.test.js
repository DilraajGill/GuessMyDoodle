import Round from "./Round";
describe("round class tests", () => {
  const mockPlayers = [
    { username: "Dilraaj", socket: { emit: jest.fn() } },
    { username: "Dilraaj2", socket: { emit: jest.fn() } },
    { username: "Dilraaj3", socket: { emit: jest.fn() } },
  ];
  const lobbyId = "ABCDE";
  const words = ["Dilraaj", "Custom", "Words"];
  const round = new Round(mockPlayers, lobbyId, words);

  test("initialise round", () => {
    round.initialise();
    expect(round.getCurrentDrawer().username).toBe("Dilraaj");
    expect(round.getCurrentDrawer().socket.emit).toHaveBeenCalledWith(
      "drawing-permitted"
    );
  });
  test("should have next drawer avaiable", () => {
    expect(round.hasNextDrawer()).toBe(true);
  });
  test("setting word should update variable", () => {
    const newWord = "NewWord";
    round.setWord(newWord);
    expect(round.selectedWord).toBe(newWord);
  });
  test("checking if everyone guessed correctly should return false", () => {
    expect(round.allGuessedCorrect()).toBe(false);
  });
  test("user guessing correctly returns true", () => {
    const selectedUser = round.players[1];
    expect(round.guess("NewWord", selectedUser)).toBe(true);
    expect(round.players[1].hasGuessedCorrectly).toBe(true);
  });
  test("reset guessed correctly tag", () => {
    round.resetGuesses();
    expect(round.players[1].hasGuessedCorrectly).toBe(false);
  });
});
