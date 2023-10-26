import supertest from "supertest";
import app from "./server";

const request = supertest(app);

describe("Login Tests", () => {
    test("login with user", async () => {
        const testUser = {
            username: "Test",
            password: "testing123"
        }
        const response = await request.post("/auth/login")
                                        .send(testUser)
                                        .set("Content-Type", "application/json");
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("auth", true);
    })

    test("login with invalid user", async () => {
        const testUser = {
            username: "WrongUser",
            password: "WrongPassword"
        }
        const response = await request.post("/auth/login")
                                        .send(testUser)
                                        .set("Content-Type", "application/json");
        expect(response.status).toBe(400);
    })
})