import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import GameCustomisation from "./GameCustomisation";

describe("testing game customisation", () => {
  let mockSocket = {
    emit: jest.fn(),
  };

  test("change privacy", () => {
    render(
      <GameCustomisation
        socket={mockSocket}
        rounds={1}
        minutes={1}
        lobbyType="private"
        length={1}
        customWords=""
      />
    );

    const publicChoice = screen.getByTestId("public-lobby-toggle");
    fireEvent.click(publicChoice);
    expect(mockSocket.emit).toHaveBeenCalledWith("update-privacy", "public");

    const privateChoice = screen.getByTestId("private-lobby-toggle");
    fireEvent.click(privateChoice);
    expect(mockSocket.emit).toHaveBeenCalledWith("update-privacy", "private");
  });

  test("change number of rounds", () => {
    render(
      <GameCustomisation
        socket={mockSocket}
        rounds={1}
        minutes={1}
        lobbyType="private"
        length={1}
        customWords=""
      />
    );
    const rounds = screen.getByTestId("round-updates");
    fireEvent.change(rounds, { target: { value: 2 } });
    expect(mockSocket.emit).toHaveBeenCalledWith("update-rounds", "2");
  });

  test("change number of minutes", () => {
    render(
      <GameCustomisation
        socket={mockSocket}
        rounds={1}
        minutes={1}
        lobbyType="private"
        length={1}
        customWords=""
      />
    );
    const minutes = screen.getByTestId("timer-update");
    fireEvent.change(minutes, { target: { value: 2 } });
    expect(mockSocket.emit).toHaveBeenCalledWith("update-minutes", "2");
  });

  test("change custom words", () => {
    render(
      <GameCustomisation
        socket={mockSocket}
        rounds={1}
        minutes={1}
        lobbyType="private"
        length={1}
        customWords=""
      />
    );
    const words = "These are, Custom, Words";
    const customWordsArea = screen.getByPlaceholderText(
      /Separate words by adding a comma/i
    );
    fireEvent.change(customWordsArea, { target: { value: words } });
    expect(mockSocket.emit).toHaveBeenCalledWith("update-words", words);
  });

  test("button is disabled when only one player", () => {
    render(
      <GameCustomisation
        socket={mockSocket}
        rounds={1}
        minutes={1}
        lobbyType="private"
        length={1}
        customWords=""
      />
    );

    expect(screen.getByText("Start Game")).toBeDisabled();
  });

  test("button is enabled when two players", () => {
    render(
      <GameCustomisation
        socket={mockSocket}
        rounds={1}
        minutes={1}
        lobbyType="private"
        length={2}
        customWords=""
      />
    );
    expect(screen.getByText("Start Game")).toBeEnabled();
  });

  test("tooltip displayed when disabled", () => {
    render(
      <GameCustomisation
        socket={mockSocket}
        rounds={1}
        minutes={1}
        lobbyType="private"
        length={1}
        customWords=""
      />
    );
    const start = screen.getByText("Start Game");
    fireEvent.mouseOver(start);
    expect(
      screen.getByText("Cannot start game with only 1 player!")
    ).toBeInTheDocument();
  });

  test("clicking start will emit the message", () => {
    render(
      <GameCustomisation
        socket={mockSocket}
        rounds={1}
        minutes={1}
        lobbyType="private"
        length={2}
        customWords=""
      />
    );
    fireEvent.click(screen.getByText("Start Game"));
    expect(mockSocket.emit).toHaveBeenCalledWith("start-game");
  });
});
