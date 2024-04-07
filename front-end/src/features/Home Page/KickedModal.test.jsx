import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import KickedModal from "./KickedModal";

describe("testing KickedModal", () => {
  test("render modal", () => {
    render(<KickedModal show={true} onClose={jest.fn()} />);
    expect(screen.getByText("Kicked From Lobby!")).toBeInTheDocument();
    expect(
      screen.getByText("You have been kicked from the lobby!")
    ).toBeInTheDocument();
  });
  test("hide component if not show", () => {
    render(<KickedModal show={false} onClose={jest.fn()} />);
    expect(screen.queryByText("Kicked From Lobby!")).not.toBeInTheDocument();
  });
  test("run onClose if clicked", () => {
    const fakeFunction = jest.fn();
    render(<KickedModal show={true} onClose={fakeFunction} />);
    fireEvent.click(screen.getByText("Close"));
    expect(fakeFunction).toHaveBeenCalled();
  });
});
