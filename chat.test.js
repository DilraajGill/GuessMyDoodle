import supertest from "supertest";
import app from "./server";
import { io } from "socket.io-client";

const request = supertest(app);
let client;
let secondClient;
beforeAll((done) => {
  client = io.connect("http://localhost:3001");
  client.on("connect", () => {
    done();
  });
  secondClient = io.connect("http://localhost:3001");
});
describe("messaging", () => {
  test("send message", (done) => {
    client.emit("send-message", {
      text: "Hello",
      username: "Test",
      lobbyId: "ABCDE",
    });
    client.once("correct-message", () => {
      done();
    });
  });
  test("receive message", (done) => {
    client.emit("send-message", {
      text: "Hello",
      username: "Test",
      lobbyId: "ABCDE",
    });
    secondClient.once("receive-message", (data) => {
      done();
    });
  });
});
