import React from "react";
import { render, screen } from "@testing-library/react";
import PlayerCard from "./PlayerCard";

describe("testing Player Card", () => {
  const mockPlayer = "Dilraaj";
  const mockPoints = 500;
  const colour = "Blue";
  test("display the player", () => {
    render(
      <PlayerCard player={mockPlayer} points={mockPoints} colour={colour} />
    );
    expect(screen.getByText(`${mockPlayer}`)).toBeInTheDocument();
    expect(screen.getByText(`${mockPoints}`)).toBeInTheDocument();
  });
});
