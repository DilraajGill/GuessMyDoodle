import supertest from "supertest";
import app from "./server";
import { io } from "socket.io-client";

const request = supertest(app);

let client;
let secondClient;
beforeAll((done) => {
  client = io.connect("http://localhost:3001");
  secondClient = io.connect("http://localhost:3001");
  client.on("connect", () => {
    done();
  });
});
describe("game tests", () => {
  test("connection", async () => {
    expect(client.connected).toBe(true);
  });

  test("drawing client", (done) => {
    client.emit("drawing", { x: 190, y: 290 });

    client.once("drawing", (data) => {
      done();
    });
  });

  test("invalid drawing client", (done) => {
    client.emit("drawing");

    client.once("incorrectDrawing", () => {
      done();
    });
  });

  test("test begin drawing", (done) => {
    client.emit("beginDrawing");

    client.once("beginDrawing", () => {
      done();
    });
  });

  test("first one drawing only", (done) => {
    client.emit("test-drawing-allowed");
    client.once("drawing-allowed", () => {
      done();
    });
  });

  test("second user cannot draw", (done) => {
    secondClient.emit("test-drawing-allowed");
    secondClient.once("drawing-not-allowed", () => {
      done();
    });
  });

  test("joining invalid game", (done) => {
    client.emit("join-lobby", { lobbyId: "ABCDE", username: "Test" });
    client.once("invalid-game", () => {
      done();
    });
  });
});
