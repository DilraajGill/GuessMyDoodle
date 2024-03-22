import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import PlayerCard from "./PlayerCard";

describe("testing Player Card", () => {
  const mockPlayer = "Dilraaj";
  const mockPoints = 500;
  const mockPicture = "1.jpg";
  const drawing = false;
  const host = false;
  const kick = jest.fn();
  test("display the player", () => {
    render(
      <PlayerCard
        player={mockPlayer}
        points={mockPoints}
        picture={mockPicture}
        drawing={drawing}
        host={host}
        kick={kick}
      />
    );
    expect(screen.getByText(`${mockPlayer}`)).toBeInTheDocument();
    expect(screen.getByText("Points: 500")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute("src", `../${mockPicture}`);
  });

  test("kick function ran when clicked", () => {
    render(
      <PlayerCard
        player={mockPlayer}
        points={mockPoints}
        picture={mockPicture}
        drawing={drawing}
        host={host}
        kick={kick}
      />
    );
    fireEvent.click(screen.getByText("Points: 500"));
    expect(kick).toHaveBeenCalledWith("Dilraaj");
  });
  test("display host icon", () => {
    render(
      <PlayerCard
        player={mockPlayer}
        points={mockPoints}
        picture={mockPicture}
        drawing={drawing}
        host={true}
        kick={kick}
      />
    );
    expect(screen.getByTestId("host-icon")).toBeInTheDocument();
  });

  test("display drawing icon", () => {
    render(
      <PlayerCard
        player={mockPlayer}
        points={mockPoints}
        picture={mockPicture}
        drawing={true}
        host={false}
        kick={kick}
      />
    );
    expect(screen.getByTestId("drawing-icon")).toBeInTheDocument();
  });
});
