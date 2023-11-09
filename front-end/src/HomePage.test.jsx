import React from "react";
import {render, screen} from "@testing-library/react";
import HomePage from "./HomePage";
import checkAuthentication from "./checkAuthentication";
import axios from "axios";
jest.mock("axios");

describe("home page test" , () => {
    test("logged in", async () => {
        axios.get.mockResolvedValue({data : {auth: true}});
        render(<HomePage/>);
        expect(screen.getByText("Home Page")).toBeInTheDocument();
    });

    test("not logged in", async () => {
        axios.get.mockResolvedValue({data : {auth : false }});
        const navigationMock = jest.fn();
        await checkAuthentication({axios, navigate : navigationMock});
        expect(navigationMock).toBeCalledWith("/login");
    })
})