import React from "react";
import Hints from "./Hints";
import { render, screen } from "@testing-library/react";

describe("testing hints visibility", () => {
  test("hide word visibility if hidden", () => {
    const word = "hello with space";
    render(<Hints word={word} hidden={true} drawing={false} />);
    const hint = screen.getAllByTestId("hint");
    expect(hint).toHaveLength(word.length);
    let item = "";
    hint.forEach((div) => {
      item += div.textContent;
    });
    expect(item).toEqual("_____ ____ _____");
  });

  test("show the full word if drawing", () => {
    const word = "hello";
    render(<Hints word={word} hidden={true} drawing={true} />);
    const hint = screen.getAllByTestId("hint");
    expect(hint).toHaveLength(word.length);
    let item = "";
    hint.forEach((div) => {
      item += div.textContent;
    });
    expect(item).toEqual("hello");
  });
});
