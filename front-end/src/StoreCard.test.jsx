import React from "react";
import StoreCard from "./StoreCard";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PaintBucket } from "react-bootstrap-icons";

describe("Store Card tests", () => {
  const name = "Fill Tool";
  const buttonText = "Buy Fill Tool";
  const isOwned = false;
  const onPurchaseClick = jest.fn();

  test("render the store card component", () => {
    render(
      <StoreCard
        Icon={PaintBucket}
        name={name}
        buttonText={buttonText}
        isOwned={isOwned}
        onPurchaseClick={onPurchaseClick}
      />
    );

    expect(screen.getByText(name)).toBeInTheDocument();
    expect(screen.getByText(buttonText)).toBeInTheDocument();
  });

  test("running mock function when pressed", () => {
    render(
      <StoreCard
        Icon={PaintBucket}
        name={name}
        buttonText={buttonText}
        isOwned={isOwned}
        onPurchaseClick={onPurchaseClick}
      />
    );
    userEvent.click(screen.getByText(buttonText));
    expect(onPurchaseClick).toHaveBeenCalled();
  });

  test("button should be disabled and secondary if owned", () => {
    render(
      <StoreCard
        Icon={PaintBucket}
        name={name}
        buttonText={buttonText}
        isOwned={true}
        onPurchaseClick={onPurchaseClick}
      />
    );
    expect(screen.getByText(buttonText)).toBeDisabled();
    expect(screen.getByText(buttonText)).toHaveClass("btn-secondary");
  });
});
