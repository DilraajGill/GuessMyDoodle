import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import ChatBox, { receiveMessage } from "./ChatBox";

const username = "Test";
const text = "Testing Message";

const mockSocket = {
  on: jest.fn(),
  emit: jest.fn(),
};

describe("testing chatbox front-end", () => {
  test("sending message displays in chat", async () => {
    // Test to ensure sending messages will display in the chat
    render(<ChatBox socket={mockSocket} username={username} />);
    const input = screen.getByRole("textbox");
    // submit the form
    fireEvent.change(input, {
      target: { value: text },
    });
    fireEvent.click(screen.getByText("Send"));
    // expect mocksocket to be called to send message to server
    expect(mockSocket.emit).toHaveBeenCalledWith("send-message", {
      username,
      text,
    });
  });

  test("receiving message displays in chat", async () => {
    // Test to ensure that received messages will be displayed in the chat
    render(<ChatBox socket={mockSocket} username={username} />);
    const testMessage = {
      username,
      text,
    };
    const mockSetMessages = jest.fn();
    receiveMessage(testMessage, mockSetMessages);
    // ensure receiveMessage runs the callback
    expect(mockSetMessages).toHaveBeenCalled();
  });
});
