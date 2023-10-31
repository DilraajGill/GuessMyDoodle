import supertest from "supertest";
import app from "./server";
import { io } from "socket.io-client";

const request = supertest(app);

let client;
beforeAll(() => {
    client = io.connect("http://localhost:3001");
})
describe("game tests", () => {
    test("connection", async () => {
        expect(client.connected).toBe(true);
    })
})