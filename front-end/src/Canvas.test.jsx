import React from "react";
import Canvas from "./Canvas";
import {render, screen} from "@testing-library/react";
import 'jest-canvas-mock';

describe("Canvas Tests", () => {
    test("rendering canvas", () => {
        render(<Canvas/>);
        expect(screen.getByRole("canvas")).toBeInTheDocument();
    })
})