import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Podium from "./Podium";

describe("testing Podium", () => {
  const playAgain = jest.fn();
  const positions = [
    {
      username: "Dilraaj",
      profilePicture: "image1.jpg",
    },
    { username: "Dilraaj2", profilePicture: "image2.jpg" },
    { username: "Dilraaj3", profilePicture: "image3.jpg" },
  ];
  const userPosition = 1;

  test("display podium position correctly", () => {
    render(
      <Podium
        podiumPositions={positions}
        userPosition={userPosition}
        playAgain={playAgain}
      />
    );
    positions.forEach((player, index) => {
      expect(screen.getByText(player.username)).toBeInTheDocument();
      expect(screen.getByText(`#${index + 1}`)).toBeInTheDocument();
    });
  });

  test("display user 1st final position", () => {
    render(
      <Podium
        podiumPositions={positions}
        userPosition={userPosition}
        playAgain={playAgain}
      />
    );
    expect(screen.getByText("You finished 1st")).toBeInTheDocument();
  });

  test("display user 2nd final position", () => {
    render(
      <Podium
        podiumPositions={positions}
        userPosition={2}
        playAgain={playAgain}
      />
    );
    expect(screen.getByText("You finished 2nd")).toBeInTheDocument();
  });

  test("display user 3rd final position", () => {
    render(
      <Podium
        podiumPositions={positions}
        userPosition={3}
        playAgain={playAgain}
      />
    );
    expect(screen.getByText("You finished 3rd")).toBeInTheDocument();
  });

  test("display user 4th final position", () => {
    render(
      <Podium
        podiumPositions={positions}
        userPosition={4}
        playAgain={playAgain}
      />
    );
    expect(screen.getByText("You finished 4th")).toBeInTheDocument();
  });

  test("call play again", () => {
    render(
      <Podium
        podiumPositions={positions}
        userPosition={4}
        playAgain={playAgain}
      />
    );
    fireEvent.click(screen.getByText("Play Again!"));
    expect(playAgain).toHaveBeenCalled();
  });
});
