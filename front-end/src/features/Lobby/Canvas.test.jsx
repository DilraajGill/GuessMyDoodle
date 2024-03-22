import React from "react";
import Canvas from "./Canvas";
import { fireEvent, render, screen } from "@testing-library/react";
import "jest-canvas-mock";

describe("Canvas Tests", () => {
  // Define mock objects to be passed to component
  const mockSocket = {
    emit: jest.fn(),
    on: jest.fn(),
  };
  const mockLineThickness = 2;
  const mockColour = "#00000";
  const mockLobbyId = "ABCDE";

  test("rendering canvas", () => {
    render(
      <Canvas
        lineThickness={mockLineThickness}
        colour={mockColour}
        socket={mockSocket}
        lobbyId={mockLobbyId}
      />
    );
    // expect it to be in the document
    expect(screen.getByRole("canvas")).toBeInTheDocument();
  });

  test("begin drawing called", () => {
    render(
      <Canvas
        lineThickness={mockLineThickness}
        colour={mockColour}
        socket={mockSocket}
        lobbyId={mockLobbyId}
      />
    );
    // Ensure socket transmission is called when on mouseDown
    const canvasScreen = screen.getByRole("canvas");
    fireEvent.mouseDown(canvasScreen, { clientX: 50, clientY: 50 });
    expect(mockSocket.emit).toHaveBeenCalledWith("beginDrawing", {
      lobbyId: mockLobbyId,
    });
  });

  test("end drawing called", () => {
    render(
      <Canvas
        lineThickness={mockLineThickness}
        colour={mockColour}
        socket={mockSocket}
        lobbyId={mockLobbyId}
      />
    );
    const canvasScreen = screen.getByRole("canvas");
    fireEvent.mouseUp(canvasScreen);
    // Ensure it has stopped drawing once the mouse is no longer down
    expect(mockSocket.emit).not.toHaveBeenCalledWith("drawing");
  });

  test("moving drawing called", async () => {
    render(
      <Canvas
        lineThickness={mockLineThickness}
        colour={mockColour}
        socket={mockSocket}
        lobbyId={mockLobbyId}
      />
    );
    const canvasScreen = screen.getByRole("canvas");
    // Ensure transmission of game information once drawing on canvas
    fireEvent.mouseDown(canvasScreen, { clientX: 50, clientY: 90 });
    fireEvent.mouseMove(canvasScreen, {
      nativeEvent: { offsetX: 50, offsetY: 100 },
    });
    fireEvent.mouseMove(canvasScreen, {
      nativeEvent: { offsetX: 100, offsetY: 200 },
    });
    expect(mockSocket.emit).toBeCalledWith("drawing", expect.any(Object));
  });

  test("drawing not possible without mouseDown", () => {
    render(
      <Canvas
        lineThickness={mockLineThickness}
        colour={mockColour}
        socket={mockSocket}
        lobbyId={mockLobbyId}
      />
    );
    // Ensure that the mouse not being down will not cause it to draw
    const canvasScreen = screen.getByRole("canvas");
    fireEvent.mouseMove(canvasScreen, { clientX: 50, clientY: 100 });
    expect(mockSocket.emit).not.toHaveBeenCalledWith("drawing");
  });
});
