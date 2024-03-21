import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ChooseWords from "./ChooseWords";

describe("display selection of words", () => {
  const listOfWords = ["Dilraaj", "Was", "Here"];
  const mockFunction = jest.fn();
  test("display words", () => {
    render(<ChooseWords list={listOfWords} click={mockFunction} />);
    expect(screen.getByText(listOfWords[0])).toBeInTheDocument();
    expect(screen.getByText(listOfWords[1])).toBeInTheDocument();
    expect(screen.getByText(listOfWords[2])).toBeInTheDocument();
  });
  test("clicking button calls function", () => {
    render(<ChooseWords list={listOfWords} click={mockFunction} />);
    const firstButton = screen.getByText("Dilraaj");
    fireEvent.click(firstButton);
    expect(mockFunction).toHaveBeenCalled();
  });
});
