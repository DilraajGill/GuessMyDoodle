import supertest from "supertest";
import app from "./server";
import { io } from "socket.io-client";

const request = supertest(app);
beforeAll((done) => {
    client = io.connect("http://localhost:3001");
    client.on("connect", () => {
        done();
    })
    secondClient = io.connect("http://localhost:3001");
})
describe("messaging", () => {
    test("send message", () => {
        client.emit("send-message" ({text: "Hello", username: "Test"}));
        client.once("correct-message", (data) => {
            done();
        })
    })
    test ("receive message", () => {
        client.emit("send-message", ({text: "Hello", username: "Test"}));
        secondClient.once("receive-message", (done) => {
            done();
        })
    })
})