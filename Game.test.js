import Game from "./Game";
const gameSession = new Game("abcde");
const mockSocket = { emit: jest.fn(), id: "first" };

describe("Game class tests", () => {
  test("add player to game", () => {
    gameSession.addPlayer(mockSocket, "test");
    expect(gameSession.players).toHaveLength(1);
    expect(gameSession.host).toBe(mockSocket);
  });
  test("remove player from game", () => {
    const secondMock = { emit: jest.fn(), id: "second" };
    gameSession.addPlayer(secondMock, "test2");
    gameSession.removePlayer(secondMock.id);
    expect(gameSession.players).toHaveLength(1);
  });
  test("starting the game", () => {
    gameSession.start(3, 2);
    expect(gameSession.maxRounds).toBe(3);
    expect(gameSession.selectedTimer).toBe(120);
  });
  test("checking who is host", () => {
    console.log(gameSession.host);
    expect(gameSession.isHost(mockSocket)).toBe(true);
  });
  test("checking if not host", () => {
    const notHost = { id: "second" };
    expect(gameSession.isHost(notHost)).toBe(false);
  });
});
