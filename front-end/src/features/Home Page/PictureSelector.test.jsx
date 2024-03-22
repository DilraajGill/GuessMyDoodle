import React from "react";
import { render, screen } from "@testing-library/react";
import PictureSelector from "./PictureSelector";

const currentPicture = "1.jpg";
const availablePictures = ["1.jpg", "2.jpg", "3.jpg"];

describe("testing picture modifications", () => {
  test("display available pictures", () => {
    render(
      <PictureSelector
        currentPicture={currentPicture}
        availablePictures={availablePictures}
        showModal={true}
        setShowModal={jest.fn()}
      />
    );
    const image = screen.getByTestId("selected");
    expect(image).toHaveAttribute("src", `../${currentPicture}`);
  });
  test("selecting available pictures emits information", () => {
    render(
      <PictureSelector
        currentPicture={currentPicture}
        availablePictures={availablePictures}
        showModal={true}
        setShowModal={jest.fn()}
      />
    );
    const selection = screen.getAllByTestId("available");
    expect(selection).toHaveLength(availablePictures.length - 1);
  });
});
