import supertest from "supertest";
import app from "./server";
import { io } from "socket.io-client";

const request = supertest(app);

let client;
beforeAll((done) => {
    client = io.connect("http://localhost:3001");
    client.on("connect", () => {
        done();
    })
})
describe("game tests", () => {
    test("connection", async () => {
        expect(client.connected).toBe(true);
    })

    test("drawing client", (done) => {
        client.emit("drawing", { x : 190, y : 290 });

        client.once("correctDrawing", () => {
            done();
        })
    })
})