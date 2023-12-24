import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import LobbyCard from "./LobbyCard";

describe("testing Lobby Card", () => {
  const mockLobby = {
    id: "ABCDE",
    playerCount: 1,
  };
  const mockClick = jest.fn();
  test("display the lobby", () => {
    render(<LobbyCard lobby={mockLobby} onClick={mockClick} />);
    expect(screen.getByText(`Lobby ID: ${mockLobby.id}`)).toBeInTheDocument();
    expect(
      screen.getByText(`Player Count: ${mockLobby.playerCount}`)
    ).toBeInTheDocument();
  });
});
