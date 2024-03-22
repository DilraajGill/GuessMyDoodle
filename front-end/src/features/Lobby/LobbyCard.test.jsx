import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import LobbyCard from "./LobbyCard";

describe("testing Lobby Card", () => {
  const mockLobby = {
    id: "ABCDE",
    playerCount: 1,
    host: "Dilraaj",
    icon: "1.jpg",
  };
  const mockClick = jest.fn();
  test("display the lobby", () => {
    render(<LobbyCard lobby={mockLobby} onClick={mockClick} />);
    expect(screen.getByText(mockLobby.host)).toBeInTheDocument();
    expect(screen.getByText(`#${mockLobby.id}`)).toBeInTheDocument();
    expect(
      screen.getByText(`Players: ${mockLobby.playerCount}`)
    ).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute("src", mockLobby.icon);
  });

  test("call onClick", () => {
    render(<LobbyCard lobby={mockLobby} onClick={mockClick} />);
    fireEvent.click(screen.getByTestId("lobby-button"));
    expect(mockClick).toHaveBeenCalledTimes(1);
  });
});
