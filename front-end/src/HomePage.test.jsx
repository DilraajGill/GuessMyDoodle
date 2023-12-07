import React from "react";
import { render, screen } from "@testing-library/react";
import HomePage from "./HomePage";
import checkAuthentication from "./checkAuthentication";
import axios from "axios";
jest.mock("axios");

describe("home page test", () => {
  test("logged in", async () => {
    // test to ensure authorised users are allowed to stay
    axios.get.mockResolvedValue({ data: { auth: true } });
    const navigationMock = jest.fn();
    expect(await checkAuthentication({ axios, navigationMock })).toEqual({
      auth: true,
    });
  });

  test("not logged in", async () => {
    // test to ensure unauthorised users return false
    axios.get.mockResolvedValue({ data: { auth: false } });
    const navigationMock = jest.fn();
    expect(await checkAuthentication({ axios, navigationMock })).toEqual({
      auth: false,
    });
  });
});
