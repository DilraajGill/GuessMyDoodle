import Store from "./Store";
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import { authContext } from "../../App";

jest.mock("axios");

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

const context = {
  auth: true,
  username: "Dilraaj",
  points: 12345,
  profilePicture: "1.jpg",
  tools: [],
  purchasedProfilePicture: ["1.jpg"],
};

describe("test store display", () => {
  test("display username and points", () => {
    render(
      <authContext.Provider value={[context, jest.fn()]}>
        <Store />
      </authContext.Provider>
    );
    expect(screen.getByText(context.username)).toBeInTheDocument();
    expect(screen.getByText(context.points)).toBeInTheDocument();
  });
  test("go to home button", () => {
    render(
      <authContext.Provider value={[context, jest.fn()]}>
        <Store />
      </authContext.Provider>
    );
    fireEvent.click(screen.getByText("Go To Home!"));
    expect(mockNavigate).toHaveBeenCalledWith("/home");
  });
  test("buy fill item from the store", async () => {
    render(
      <authContext.Provider value={[context, jest.fn()]}>
        <Store />
      </authContext.Provider>
    );
    axios.post.mockResolvedValue({ data: { success: true } });
    fireEvent.click(screen.getByText("10,000 Points"));
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith("/store/buy/fill-tool");
    });
  });
  test("buy profile picture", async () => {
    render(
      <authContext.Provider value={[context, jest.fn()]}>
        <Store />
      </authContext.Provider>
    );
    axios.post.mockResolvedValue({ data: { success: true } });
    fireEvent.click(screen.getAllByText("5,000 Points")[0]);
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith("/store/buy/2");
    });
  });
});
