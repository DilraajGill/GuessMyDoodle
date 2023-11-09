import supertest from "supertest";
import app from "./server";
const request = supertest(app);

describe("check-authentication", () => {
    test("authentication when signed in", async () => {

    })

    test("authentication when signed out", async() => {
        
    })
})