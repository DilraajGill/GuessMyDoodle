import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ExpiredSession from "./ExpiredSession";

describe("testing ExpiredSession", () => {
  const close = jest.fn();
  test("render modal if true", () => {
    render(<ExpiredSession show={true} onClose={close} />);
    expect(
      screen.getByText(
        "The session has ended becasue there are not enough players in the game!"
      )
    ).toBeInTheDocument();
  });

  test("call close if clicked", () => {
    render(<ExpiredSession show={true} onClose={close} />);
    fireEvent.click(screen.getByText("Close"));
    expect(close).toHaveBeenCalled();
  });
});
