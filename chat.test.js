import supertest from "supertest";
import app from "./server";
import { io } from "socket.io-client";

const request = supertest(app);
beforeAll((done) => {
    client = io.connect("http://localhost:3001");
    client.on("connect", () => {
        done();
    })
})
describe("messaging", () => {
    test("send message", () => {

    })
    test ("receive message", () => {

    })
})