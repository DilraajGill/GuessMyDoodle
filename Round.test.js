import Round from "./Round";
describe("round class tests", () => {
  // Define mock objects for tests
  const mockPlayers = [
    { username: "Dilraaj", socket: { emit: jest.fn() } },
    { username: "Dilraaj2", socket: { emit: jest.fn() } },
    { username: "Dilraaj3", socket: { emit: jest.fn() } },
  ];
  const lobbyId = "ABCDE";
  const words = ["Dilraaj", "Custom", "Words", "Multiple", "Characters"];
  const round = new Round(mockPlayers, lobbyId, words);

  test("initialise round", () => {
    // initialise the round and expect information about who is drawing to be the first user
    round.initialise();
    expect(round.getCurrentDrawer().username).toBe("Dilraaj");
    expect(round.getCurrentDrawer().socket.emit).toHaveBeenCalledWith(
      "drawing-permitted"
    );
  });
  test("should have next drawer avaiable", () => {
    // test to ensure there is another drawer available
    expect(round.hasNextDrawer()).toBe(true);
  });
  test("return 3 words from list", () => {
    const result = round.getRandomWords();
    expect(result).toHaveLength(3);
  });
  test("setting word should update variable", () => {
    // test to ensuure setWord method updates variable
    const newWord = "NewWord";
    round.setWord(newWord);
    expect(round.selectedWord).toBe(newWord);
  });
  // test to guessed correct method works as intended
  test("checking if everyone guessed correctly should return false", () => {
    expect(round.allGuessedCorrect()).toBe(false);
  });
  // test to ensure flag tracking who has guessed correctly is working
  test("user guessing correctly returns true", () => {
    const selectedUser = round.players[1].socket;
    expect(round.guess("NewWord", selectedUser)).toBe(true);
    expect(round.players[1].hasGuessedCorrectly).toBe(true);
  });
  // test to reset flag at the end of each user's turn
  test("reset guessed correctly tag", () => {
    round.resetGuesses();
    expect(round.players[1].hasGuessedCorrectly).toBe(false);
  });
  // test to make sure at end of timer, currently drawing will adjust
  test("going to next user will swap currentlyDrawing tag", () => {
    round.nextDrawer();
    expect(round.getCurrentDrawer().username).toBe("Dilraaj2");
    expect(round.players[0].hasDrawn).toBe(true);
  });
});
