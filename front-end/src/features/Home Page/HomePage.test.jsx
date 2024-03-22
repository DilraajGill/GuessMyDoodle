import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import HomePage from "./HomePage";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";
import { authContext } from "../../App";
jest.mock("axios");

describe("home page test", () => {
  const context = {
    signedIn: true,
    username: "Test",
    profilePicture: "1.jpg",
    points: 5000,
  };
  const setContext = jest.fn();

  test("display the username and points", () => {
    axios.get.mockResolvedValue({ data: [] });
    render(
      <authContext.Provider value={[context, setContext]}>
        <BrowserRouter>
          <HomePage />
        </BrowserRouter>
      </authContext.Provider>
    );
    expect(screen.getByText(context.username)).toBeInTheDocument();
    expect(screen.getByText(context.points)).toBeInTheDocument();
  });

  test("sign out functionality", async () => {
    axios.get
      .mockResolvedValueOnce({ data: [] })
      .mockResolvedValueOnce({ data: { auth: false } });

    render(
      <authContext.Provider value={[context, setContext]}>
        <BrowserRouter>
          <HomePage />
        </BrowserRouter>
      </authContext.Provider>
    );
    fireEvent.click(screen.getByText(context.username));
    expect(screen.getByText("Sign Out")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Sign Out"));
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith("/auth/sign-out");
    });
  });
});
