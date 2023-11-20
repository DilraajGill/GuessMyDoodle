import supertest from "supertest";
import app from "./server";

const request = supertest(app);

describe("request new lobby", () => {
  let cookie;
  test("valid request", async () => {
    const testUser = {
      username: "Test",
      password: "testing123",
    };
    const response = await request
      .post("/auth/login")
      .send(testUser)
      .set("Content-Type", "application/json");
    cookie = response.headers["set-cookie"];
    const lobbyResponse = await request
      .post("/create-lobby")
      .set("Cookie", cookie);
    console.log(lobbyResponse);
    expect(lobbyResponse.body).toHaveProperty("lobbyId");
  });
  test("invalid request", async () => {
    const lobbyResponse = await request.post("/create-lobby");
    expect(lobbyResponse.body.error).toBe("User not authenticated");
  });
});
