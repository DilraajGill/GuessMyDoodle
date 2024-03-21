import supertest from "supertest";
import app from "./server";

const request = supertest(app);

describe("Login Tests", () => {
  // test to enusre legitimate account is allowed access
  beforeAll(async () => {
    const testUser = {
      username: "Test",
      password: "Testing123!",
      email: "testing@gmail.com",
    };
    // emit this to the back-end server
    const response = await request
      .post("/auth/register")
      .send(testUser)
      .set("Content-Type", "application/json");
  });

  test("login with user", async () => {
    // login with a test user that has account in database
    const testUser = {
      username: "Test",
      password: "Testing123!",
    };
    // submit response
    const response = await request
      .post("/auth/login")
      .send(testUser)
      .set("Content-Type", "application/json");
    // expect HTML response to be successful
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("auth", true);
  });
  // test to ensure illegitimate account is not granted access
  test("login with invalid user", async () => {
    // attempt login with invalid credentials
    const testUser = {
      username: "WrongUser",
      password: "WrongPassword",
    };
    // submit request and expect invalid HTML response
    const response = await request
      .post("/auth/login")
      .send(testUser)
      .set("Content-Type", "application/json");
    expect(response.status).toBe(401);
  });
  // tests to ensure missing parameters does not result in authentication
  test("login with no username", async () => {
    const testUser = {
      password: "testing123",
    };
    const response = await request
      .post("/auth/login")
      .send(testUser)
      .set("Content-Type", "application/json");
    expect(response.status).toBe(400);
  });

  test("login with no password", async () => {
    // create test user with missing property
    const testUser = {
      username: "Test",
    };
    // expect status 400 on response
    const response = await request
      .post("/auth/login")
      .send(testUser)
      .set("Content-Type", "application/json");
    expect(response.status).toBe(400);
  });
  // test to ensure empty fields does not result in successful authentication
  test("login with empty string password", async () => {
    // create test user with empty property
    const testUser = {
      username: "Test",
      password: "",
    };
    // expect invalid response from server
    const response = await request
      .post("/auth/login")
      .send(testUser)
      .set("Content-Type", "application/json");
    expect(response.status).toBe(400);
  });
});
