import Game from "./Game";
import GameDispatcher from "./GameDispatcher";
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
const Games = new GameDispatcher(mockIo);
const mockSocket = { emit: jest.fn(), id: "first", join: jest.fn() };

describe("Testing Game dispatcher", () => {
  let addedLobby;
  test("add game to dispatcher", () => {
    addedLobby = Games.create();
    expect(typeof addedLobby).toBe("string");
    expect(addedLobby).toHaveLength(5);
  });
  test("does this game exist", () => {
    const outcome = Games.checkExists(addedLobby);
    expect(outcome).toBe(true);
  });
  test("handle joining game", () => {
    Games.joinGame(addedLobby, mockSocket, "Test");
    expect(mockIo.to).toHaveBeenCalledWith(addedLobby);
  });
  test("send message to dispatcher", () => {
    Games.messageGame(addedLobby, "Hello", "Test");
    expect(mockSocket.join).toHaveBeenCalled();
    expect(mockIo.to).toHaveBeenCalledWith(addedLobby);
  });
  test("add drawing", () => {
    Games.addDrawing(addedLobby, mockSocket, { x: 190, y: 290 });
    expect(mockIo.to).toHaveBeenCalledWith(addedLobby);
  });
  test("remove game from dispatcher", () => {
    const outcome = Games.remove(addedLobby);
    expect(outcome).toBe(true);
  });
  test("update minutes", () => {
    Games.updateMinutes(mockSocket, 2);
    expect(mockIo.to).toHaveBeenCalledWith(addedLobby);
  });
  test("update max rounds", () => {
    Games.updateRounds(mockSocket, 2);
    expect(mockIo.to).toHaveBeenCalledWith(addedLobby);
  });
  test("remove added player", () => {
    Games.removePlayer(mockSocket);
    expect(mockIo.to).toHaveBeenCalledWith(addedLobby);
  });
  test("remove game that does not exist", () => {
    const outcome = Games.remove("AASDASD");
    expect(outcome).toBe(false);
  });
  test("does the game still exist after removed", () => {
    const outcome = Games.checkExists(addedLobby);
    expect(outcome).toBe(false);
  });
});
