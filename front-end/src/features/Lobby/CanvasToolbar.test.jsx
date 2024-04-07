import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CanvasToolbar from "./CanvasToolbar";

describe("testing CanvasToolbar", () => {
  const mockSet = jest.fn();
  const mockUndo = jest.fn();
  const mockClear = jest.fn();

  test("display toolbar", () => {
    render(
      <CanvasToolbar
        drawingTool="draw"
        setDrawingTool={mockSet}
        ownedTools={["fill"]}
        undoMove={mockUndo}
        clearCanvas={mockClear}
      />
    );
    expect(screen.getByText("E")).toBeInTheDocument();
    expect(screen.getByText("F")).toBeInTheDocument();
    expect(screen.getByText("U")).toBeInTheDocument();
  });

  test("selecting eraser calls mockSet", () => {
    render(
      <CanvasToolbar
        drawingTool="draw"
        setDrawingTool={mockSet}
        ownedTools={["fill"]}
        undoMove={mockUndo}
        clearCanvas={mockClear}
      />
    );
    fireEvent.click(screen.getByText("E"));
    expect(mockSet).toHaveBeenCalledWith("eraser");
  });
  test("selecting fill calls mockSet", () => {
    render(
      <CanvasToolbar
        drawingTool="draw"
        setDrawingTool={mockSet}
        ownedTools={["fill"]}
        undoMove={mockUndo}
        clearCanvas={mockClear}
      />
    );
    fireEvent.click(screen.getByText("F"));
    expect(mockSet).toHaveBeenCalledWith("fill");
  });
  test("selecting undo calls mockUndo", () => {
    render(
      <CanvasToolbar
        drawingTool="draw"
        setDrawingTool={mockSet}
        ownedTools={["fill"]}
        undoMove={mockUndo}
        clearCanvas={mockClear}
      />
    );
    fireEvent.click(screen.getByText("U"));
    expect(mockUndo).toHaveBeenCalled();
  });
  test("selecting delete calls mockClear", () => {
    render(
      <CanvasToolbar
        drawingTool="draw"
        setDrawingTool={mockSet}
        ownedTools={["fill"]}
        undoMove={mockUndo}
        clearCanvas={mockClear}
      />
    );
    fireEvent.click(screen.getByTestId("clear"));
    expect(mockClear).toHaveBeenCalled();
  });
});
