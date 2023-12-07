import supertest from "supertest";
import app from "./server";
import mongoose from "mongoose";
// run the server through supertest framework
const request = supertest(app);
describe("Registration Tests", () => {
  // test registration functionality to ensure new users are authorised and respond with correct status
  test("register new user", async () => {
    console.log("running");
    const testUser = {
      username: "Test",
      password: "testing123",
      email: "testing@gmail.com",
    };

    const response = await request
      .post("/auth/register")
      .send(testUser)
      .set("Content-Type", "application/json");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("auth", true);
    expect(response.body).toHaveProperty("username", testUser.username);
  });

  test("registering with used username", async () => {
    // test to ensure unique username is required
    const testUser = {
      username: "Test",
      password: "testing123",
      email: "testing@gmail.com",
    };
    const response = await request
      .post("/auth/register")
      .send(testUser)
      .set("Content-Type", "application/json");
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("name", "UserExistsError");
  });
  // test to ensure username field is required
  test("missing username", async () => {
    const testUser = {
      password: "testing123",
    };
    const response = await request
      .post("/auth/register")
      .send(testUser)
      .set("Content-Type", "application/json");
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("name", "MissingUsernameError");
  });
  // test to ensure password field is required
  test("missing password", async () => {
    const testUser = {
      username: "NewTest",
    };
    const response = await request
      .post("/auth/register")
      .send(testUser)
      .set("Content-Type", "application/json");
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("name", "MissingPasswordError");
  });
  // test to enusre username field cannot be left empty
  test("empty string username", async () => {
    const testUser = {
      username: "",
      password: "testing123",
    };
    const response = await request
      .post("/auth/register")
      .send(testUser)
      .set("Content-Type", "application/json");
    expect(response.status).toBe(400);
  });
});
