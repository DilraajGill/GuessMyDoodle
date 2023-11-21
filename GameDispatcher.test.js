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
  test("remove game from dispatcher", () => {
    const outcome = Games.remove(addedLobby);
    expect(outcome).toBe(true);
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
