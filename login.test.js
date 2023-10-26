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
        console.log(response);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("auth", true);
    })
})