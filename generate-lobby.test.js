import supertest from "supertest";
import app from "./server";

const request = supertest(app);

describe("request new lobby", () => {
  let cookie;
  // test to ensure authorised user can create a lobby
  test("valid request", async () => {
    // create test user and sign in
    const testUser = {
      username: "Test",
      password: "Testing123!",
    };
    const response = await request
      .post("/auth/login")
      .send(testUser)
      .set("Content-Type", "application/json");
    // transmit cookies when signing in
    cookie = response.headers["set-cookie"];
    const lobbyResponse = await request
      .post("/create-lobby")
      .set("Cookie", cookie);
    console.log(lobbyResponse);
    // expect it to have successful response
    expect(lobbyResponse.body).toHaveProperty("lobbyId");
  });
  // test to ensure unauthorised users cannot create a lobby
  test("invalid request", async () => {
    const lobbyResponse = await request.post("/create-lobby");
    expect(lobbyResponse.body.error).toBe("User not authenticated");
  });
});
