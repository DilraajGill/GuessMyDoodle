import supertest from "supertest";
import app from "./server";

const request = supertest(app);

describe("Login Tests", () => {
  // test to enusre legitimate account is allowed access
  test("login with user", async () => {
    const testUser = {
      username: "Test",
      password: "testing123",
    };
    const response = await request
      .post("/auth/login")
      .send(testUser)
      .set("Content-Type", "application/json");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("auth", true);
  });
  // test to ensure illegitimate account is not granted access
  test("login with invalid user", async () => {
    const testUser = {
      username: "WrongUser",
      password: "WrongPassword",
    };
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
    const testUser = {
      username: "Test",
    };
    const response = await request
      .post("/auth/login")
      .send(testUser)
      .set("Content-Type", "application/json");
    expect(response.status).toBe(400);
  });
  // test to ensure empty fields does not result in successful authentication
  test("login with empty string password", async () => {
    const testUser = {
      username: "Test",
      password: "",
    };
    const response = await request
      .post("/auth/login")
      .send(testUser)
      .set("Content-Type", "application/json");
    expect(response.status).toBe(400);
  });
});
