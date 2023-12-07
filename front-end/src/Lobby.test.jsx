import React from "react";
import { render, screen } from "@testing-library/react";
import Lobby from "./Lobby";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { authContext } from "./App";

jest.mock("axios", () => ({
  get: jest
    .fn()
    .mockResolvedValue({ data: { auth: true, username: "Test", points: 0 } }),
}));

const mockAuthContextValue = [
  { auth: true, username: "Test", points: 0 },
  jest.fn(),
];
describe("testing lobby home page", () => {
  // test to ensure lobby id is displayed on screen
  test("display lobby id at the top", () => {
    const lobbyId = "abcdef";
    render(
      <authContext.Provider value={mockAuthContextValue}>
        <MemoryRouter initialEntries={[`/lobby/${lobbyId}`]}>
          <Routes>
            <Route path="lobby/:lobbyId" element={<Lobby />} />
          </Routes>
        </MemoryRouter>
      </authContext.Provider>
    );

    const lobbyIdText = screen.getByText(`Lobby ID: ${lobbyId}`);
    expect(lobbyIdText).toBeInTheDocument();
  });
});
