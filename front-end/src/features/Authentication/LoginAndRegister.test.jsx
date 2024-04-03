import React from "react";
import LoginAndRegister from "./LoginAndRegister";
import { authContext } from "../../App";
import { render, fireEvent, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

describe("testing Login and Register components", () => {
  const mockContext = { signedIn: false };
  const setContext = jest.fn();
  test("display login form when on login", () => {
    render(
      <authContext.Provider value={[mockContext, setContext]}>
        <BrowserRouter>
          <LoginAndRegister defaultState="login" />
        </BrowserRouter>
      </authContext.Provider>
    );
    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
  });
  test("display register form when on register", () => {
    render(
      <authContext.Provider value={[mockContext, setContext]}>
        <BrowserRouter>
          <LoginAndRegister defaultState="register" />
        </BrowserRouter>
      </authContext.Provider>
    );
    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email Address")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Confirm Password")).toBeInTheDocument();
  });
  test("clicking pills changes forms", () => {
    render(
      <authContext.Provider value={[mockContext, setContext]}>
        <BrowserRouter>
          <LoginAndRegister defaultState="login" />
        </BrowserRouter>
      </authContext.Provider>
    );
    fireEvent.click(screen.getByText("Register"));
    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email Address")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Confirm Password")).toBeInTheDocument();
  });
});
