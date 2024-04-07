import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import RevealWord from "./RevealWord";

describe("testing RevealWord", () => {
  const revealWord = { word: "TheWord" };
  const turnPoints = [
    { username: "Dilraaj", value: 2000 },
    { username: "Dilraaj2", value: 1000 },
  ];
  test("display the word", () => {
    render(<RevealWord revealWord={revealWord} turnPoints={turnPoints} />);
    expect(
      screen.getByText(`The word was ${revealWord.word}`)
    ).toBeInTheDocument();
  });
  test("display the user's points", () => {
    render(<RevealWord revealWord={revealWord} turnPoints={turnPoints} />);
    turnPoints.forEach((player) => {
      expect(screen.getByText(`${player.username}:`)).toBeInTheDocument();
      expect(screen.getByText(player.value)).toBeInTheDocument();
    });
  });
});
