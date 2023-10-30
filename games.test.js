import supertest from "supertest";
import app from "./server";
import { io } from "socket.io-client";

const request = supertest(app);
describe("game tests", () => {
    test("connection", async () => {
        
    })
})