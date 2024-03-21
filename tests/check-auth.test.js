import supertest from "supertest";
import app from "../server";

const request = supertest(app);

describe("check-authentication", () => {
  let cookie;
  // test to ensure that once logged in, the check-authentication route works
  test("authentication when signed in", async () => {
    // create mock user
    const testUser = {
      username: "Test",
      password: "Testing123!",
    };
    // send response ot the back end server
    const response = await request
      .post("/auth/login")
      .send(testUser)
      .set("Content-Type", "application/json");
    // save cookie and transmit when checking authentication
    cookie = response.headers["set-cookie"];
    const testAuth = await request
      .get("/auth/check-auth")
      .set("Cookie", cookie);
    expect(testAuth.body.auth).toEqual(true);
  });
  // test to ensure unauthorised users are declined access
  test("authentication when signed out", async () => {
    // try checking authentication without sending cookies
    const testAuth = await request.get("/auth/check-auth");
    expect(testAuth.body.auth).toEqual(false);
  });
});
