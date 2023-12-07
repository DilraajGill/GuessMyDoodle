import Game from "./Game";
import { Server } from "socket.io";
jest.mock("socket.io", () => {
  return {
    Server: jest.fn(() => ({
      on: jest.fn(),
      to: jest.fn(() => ({
        emit: jest.fn(),
      })),
      emit: jest.fn(),
    })),
  };
});
// creating mock objects for tests
const mockIo = new Server();
const gameSession = new Game("abcde", mockIo);
const mockSocket = { emit: jest.fn(), id: "first" };

describe("Game class tests", () => {
  // test to add players to session updates properties
  test("add player to game", () => {
    gameSession.addPlayer(mockSocket, "test");
    expect(gameSession.players).toHaveLength(1);
    expect(gameSession.host).toBe(mockSocket);
  });
  // test to remove players will accordingly update properties
  test("remove player from game", () => {
    const secondMock = { emit: jest.fn(), id: "second" };
    gameSession.addPlayer(secondMock, "test2");
    gameSession.removePlayer(secondMock.id);
    expect(gameSession.players).toHaveLength(1);
  });
  // test to ensure updating rounds will update properties
  test("updating max rounds", () => {
    gameSession.setRounds(3);
    expect(gameSession.maxRounds).toBe(3);
  });
  // test to ensure updating minutes will updating properties
  test("updating max minutes", () => {
    gameSession.setMinutes(2);
    expect(gameSession.selectedTimer).toBe(2);
  });
  // test to ensure access only to the host
  test("checking who is host", () => {
    console.log(gameSession.host);
    expect(gameSession.isHost(mockSocket)).toBe(true);
  });
  // ensuring other users who are not host are not granted access
  test("checking if not host", () => {
    const notHost = { id: "second" };
    expect(gameSession.isHost(notHost)).toBe(false);
  });
  // test to ensure the first person to join is granted access
  test("first allowed to draw", () => {
    gameSession.start();
    expect(gameSession.isDrawing(mockSocket)).toBe(true);
  });
  // test to ensure only one person can draw at any given time
  test("second not allowed to draw", () => {
    const notHost = { id: "second" };
    expect(gameSession.isDrawing(notHost)).toBe(false);
  });
  // test to ensure that the drawing information property is updated
  test("began drawing", () => {
    const drawingInformation = { x: 190, y: 290 };
    gameSession.addDrawing(drawingInformation);
    expect(gameSession.drawingHistory).toContain(drawingInformation);
  });
});
