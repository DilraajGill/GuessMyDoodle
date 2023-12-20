import Game from "./Game";
import GameDispatcher from "./GameDispatcher";
import { Server } from "socket.io";

// creating mock objects for tests
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
  // test to ensure creating lobby will return custom Id of length 5
  test("add game to dispatcher", () => {
    addedLobby = Games.create();
    expect(typeof addedLobby).toBe("string");
    expect(addedLobby).toHaveLength(5);
  });
  // testing if the game returned is stored and exists
  test("does this game exist", () => {
    const outcome = Games.checkExists(addedLobby);
    expect(outcome).toBe(true);
  });
  // test to create mock socket to join the lobby
  test("handle joining game", () => {
    Games.joinGame(addedLobby, mockSocket, "Test");
    expect(mockIo.to).toHaveBeenCalledWith(addedLobby);
  });
  // test to display message to rest of lobby
  test("send message to dispatcher and broadcast to lobby", () => {
    Games.startGame(mockSocket);
    Games.messageGame(addedLobby, "Hello", "Test");
    expect(mockSocket.join).toHaveBeenCalled();
    expect(mockIo.to).toHaveBeenCalledWith(addedLobby);
  });
  // test to add drawing and display to rest of lobby
  test("add drawing and broadcast to lobby", () => {
    Games.addDrawing(addedLobby, mockSocket, { x: 190, y: 290 });
    expect(mockIo.to).toHaveBeenCalledWith(addedLobby);
  });
  // test to remove a game from the dispather
  test("remove game from dispatcher", () => {
    const outcome = Games.remove(addedLobby);
    expect(outcome).toBe(true);
  });
  // test to update lobby settings for minutes
  test("update minutes broadcasts to lobby", () => {
    Games.updateMinutes(mockSocket, 2);
    expect(mockIo.to).toHaveBeenCalledWith(addedLobby);
  });
  // test to update the number of rounds for lobby settings
  test("update max rounds broadcasts to lobby", () => {
    Games.updateRounds(mockSocket, 2);
    expect(mockIo.to).toHaveBeenCalledWith(addedLobby);
  });
  test("update privacy to lobby", () => {
    Games.updatePrivacy(mockSocket, "public");
    expect(mockIo.to).toHaveBeenCalledWith(addedLobby);
  });
  // test to remove player through dispatcher
  test("remove added player", () => {
    Games.removePlayer(mockSocket);
    expect(mockIo.to).toHaveBeenCalledWith(addedLobby);
  });
  // test to remove a game that does not exist returns false
  test("remove game that does not exist", () => {
    const outcome = Games.remove("AASDASD");
    expect(outcome).toBe(false);
  });
  // test to ensure removed game does not exist
  test("does the game still exist after removed", () => {
    const outcome = Games.checkExists(addedLobby);
    expect(outcome).toBe(false);
  });
});
