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
const mockIo = new Server();
const gameSession = new Game("abcde", mockIo);
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
  test("updating max rounds", () => {
    gameSession.setRounds(3);
    expect(gameSession.maxRounds).toBe(3);
  });
  test("updating max minutes", () => {
    gameSession.setMinutes(2);
    expect(gameSession.selectedTimer).toBe(2);
  });
  test("checking who is host", () => {
    console.log(gameSession.host);
    expect(gameSession.isHost(mockSocket)).toBe(true);
  });
  test("checking if not host", () => {
    const notHost = { id: "second" };
    expect(gameSession.isHost(notHost)).toBe(false);
  });
  test("first allowed to draw", () => {
    expect(gameSession.isDrawing(mockSocket)).toBe(true);
  });
  test("second not allowed to draw", () => {
    const notHost = { id: "second" };
    expect(gameSession.isDrawing(notHost)).toBe(false);
  });
  test("began drawing", () => {
    const drawingInformation = { x: 190, y: 290 };
    gameSession.addDrawing(drawingInformation);
    expect(gameSession.drawingHistory).toContain(drawingInformation);
  });
});
