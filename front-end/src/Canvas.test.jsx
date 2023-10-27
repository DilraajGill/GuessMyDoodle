import React from "react";
import Canvas from "./Canvas";
import {fireEvent, render, screen} from "@testing-library/react";
import 'jest-canvas-mock';

describe("Canvas Tests", () => {
    test("rendering canvas", () => {
        render(<Canvas/>);
        expect(screen.getByRole("canvas")).toBeInTheDocument();
    })

    test("begin drawing called", () => {
        render(<Canvas/>)
        const canvasScreen = screen.getByRole("canvas");
        const consoleTest = jest.spyOn(console, "log");
        fireEvent.mouseDown(canvasScreen, { clientX: 50, clientY: 50 });
        expect(consoleTest).toHaveBeenCalledWith("Drawing Began");
        consoleTest.mockRestore()
    })

    test("end drawing called", () => {
        render(<Canvas/>);
        const canvasScreen = screen.getByRole("canvas");
        const consoleTest = jest.spyOn(console, "log");
        fireEvent.mouseUp(canvasScreen);
        expect(consoleTest).toHaveBeenCalledWith("Drawing Ended");
    })

    test("moving drawing called", () => {
        render(<Canvas/>);
        const canvasScreen = screen.getByRole("canvas");
        const consoleTest = jest.spyOn(console, "log");

        fireEvent.mouseDown(canvasScreen, { clientX: 50, clientY: 90});
        fireEvent.mouseMove(canvasScreen, { clientX: 50, clientY: 100});
        expect(consoleTest).toHaveBeenCalledWith("Drawing");
    })

    test("drawing not possible without mouseDown", ()=> {
        render(<Canvas/>);
        const canvasScreen = screen.getByRole("canvas");
        const consoleTest = jest.spyOn(console, "log");

        fireEvent.mouseMove(canvasScreen, { clientX: 50, clientY: 100});
        expect(consoleTest).toHaveBeenCalledWith("Not Drawing");
    })

})