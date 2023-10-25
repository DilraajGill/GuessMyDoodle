import supertest from "supertest";
import app from "./server"
import { User } from "./auth";

const request = supertest(app);

describe("Registration Tests", () => {

    test("register new user", async () => {
        console.log("running");
        const testUser = {
            username: "Test",
            password: "testing123"
        };

        const response = await request.post("/auth/register")
                                        .send(testUser)
                                        .set("Content-Type", "application/json");
        console.log(response);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("auth", true);
        expect(response.body).toHaveProperty("username", testUser.username);
    })
})