import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Lobby from "./Lobby";
import { MemoryRouter, Route, Routes } from "react-router-dom";

describe("testing lobby home page", () => {
  // test to ensure lobby id is displayed on screen
  test("display lobby id at the top", () => {
    const lobbyId = "abcdef";
    render(
      <MemoryRouter initialEntries={[`/lobby/${lobbyId}`]}>
        <Routes>
          <Route path="lobby/:lobbyId" element={<Lobby />} />
        </Routes>
      </MemoryRouter>
    );

    const lobbyIdText = screen.getByText(`Lobby ID: ${lobbyId}`);
    expect(lobbyIdText).toBeInTheDocument();
  });
});
