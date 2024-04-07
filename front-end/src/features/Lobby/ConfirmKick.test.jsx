import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ConfirmKick from "./ConfirmKick";

describe("testing ConfirmKick", () => {
  const mockHide = jest.fn();
  const mockKick = jest.fn();
  const kickUser = "Dilraaj";

  test("render modal", () => {
    render(
      <ConfirmKick
        show={true}
        onHide={mockHide}
        kickUser={mockKick}
        selectedUser={kickUser}
      />
    );
    expect(
      screen.getByText("Are you sure you want to kick Dilraaj")
    ).toBeInTheDocument();
  });
  test("call hide if cancelled", () => {
    render(
      <ConfirmKick
        show={true}
        onHide={mockHide}
        kickUser={mockKick}
        selectedUser={kickUser}
      />
    );
    fireEvent.click(screen.getByText("Cancel"));
    expect(mockHide).toHaveBeenCalled();
  });
  test("call kick if proceeding furhter", () => {
    render(
      <ConfirmKick
        show={true}
        onHide={mockHide}
        kickUser={mockKick}
        selectedUser={kickUser}
      />
    );
    fireEvent.click(screen.getByText("Kick"));
    expect(mockKick).toHaveBeenCalledWith("Dilraaj");
  });
});
