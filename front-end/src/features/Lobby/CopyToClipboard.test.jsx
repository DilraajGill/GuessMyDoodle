import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CopyToClipboard from "./CopyToClipboard";

describe("tests to ensure copy to clipboard is working", () => {
  const lobbyId = "ABCDE";
  Object.assign(navigator, {
    clipboard: {
      writeText: jest.fn(),
    },
  });

  test("rendering works as expected", () => {
    render(<CopyToClipboard lobbyId={lobbyId} />);
    expect(
      screen.getByText(/Click to copy URL to send to your friends!/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Lobby ID: ABCDE/i)).toBeInTheDocument();
  });

  test("clicking on card will copy the clipboard", () => {
    render(<CopyToClipboard lobbyId={lobbyId} />);
    const item = screen.getByRole("clipboard-button");
    userEvent.click(item);
    expect(navigator.clipboard.writeText).toHaveBeenCalled();
  });

  test("show toast message", async () => {
    render(<CopyToClipboard lobbyId={lobbyId} />);
    const item = screen.getByRole("clipboard-button");
    userEvent.click(item);
    await waitFor(() => {
      const message = screen.getByText(/Link has been copied to clipboard!/i);
      expect(message).toBeInTheDocument();
    });
  });
});
