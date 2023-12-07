import React from "react";
import { render, screen } from "@testing-library/react";
import CurrentlyDrawing from "./CurrentlyDrawing";

describe("testing currently drawing component", () => {
  test("display the username", () => {
    // Test to display the user currently drawing
    const username = "Dilraaj";
    render(<CurrentlyDrawing username={username} />);

    expect(
      screen.getByText(`${username} is currently drawing!`)
    ).toBeInTheDocument();
  });
});
