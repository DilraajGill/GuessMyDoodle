import supertest from "supertest";
import app from "./server";
import mongoose from "mongoose";
import { User } from "./Database";
// run the server through supertest framework
const request = supertest(app);
/**
 * @class Register
 * Testing register
 */
describe("Registration Tests", () => {
  // test registration functionality to ensure new users are authorised and respond with correct status
  /**
   * @memberof Register
   * @function testingNewRegister
   */
  beforeAll(async () => {
    await User.deleteOne({ username: "Test" });
  });

  test("register new user with invalid password", async () => {
    // create object storing user information
    const testUser = {
      username: "Test",
      password: "testing123",
      email: "testing@gmail.com",
    };
    // emit this to the back-end server
    const response = await request
      .post("/auth/register")
      .send(testUser)
      .set("Content-Type", "application/json");
    // expect response to be successful
    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      "Password does not meet the minimum requirements"
    );
  });

  test("register new user", async () => {
    // create object storing user information
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
    // expect response to be successful
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("auth", true);
    expect(response.body).toHaveProperty("username", testUser.username);
  });

  test("registering with used username", async () => {
    // test to ensure unique username is required by repeating fields
    const testUser = {
      username: "Test",
      password: "Testing123!",
      email: "testing@gmail.com",
    };
    //  emit response to backend
    const response = await request
      .post("/auth/register")
      .send(testUser)
      .set("Content-Type", "application/json");
    // expect the status to be false
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("name", "UserExistsError");
  });
  // test to ensure username field is required
  test("missing username", async () => {
    // create user object with missing field
    const testUser = {
      password: "testing123",
    };
    // submit request and expect negative response
    const response = await request
      .post("/auth/register")
      .send(testUser)
      .set("Content-Type", "application/json");
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("name", "MissingUsernameError");
  });
  // test to ensure password field is required
  test("missing password", async () => {
    // create user object with missing field
    const testUser = {
      username: "NewTest",
    };
    // submit request and expect negative response
    const response = await request
      .post("/auth/register")
      .send(testUser)
      .set("Content-Type", "application/json");
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty(
      "message",
      "Password does not meet the minimum requirements"
    );
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
    expect(response.body).toHaveProperty("name", "MissingUsernameError");
  });
});
