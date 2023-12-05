import React from "react";
import Canvas from "./Canvas";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "jest-canvas-mock";

describe("Canvas Tests", () => {
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
    const canvasScreen = screen.getByRole("canvas");
    fireEvent.mouseMove(canvasScreen, { clientX: 50, clientY: 100 });
    expect(mockSocket.emit).not.toHaveBeenCalledWith("drawing");
  });
});
