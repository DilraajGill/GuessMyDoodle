import React from "react";
import {render, screen} from "@testing-library/react";
import HomePage from "./HomePage";
import checkAuthentication from "./checkAuthentication";
import axios from "axios";
jest.mock("axios");

describe("home page test" , () => {
    test("logged in", async () => {
        axios.get.mockResolvedValue({data : {auth: true}});
        const navigationMock = jest.fn();
        expect(await checkAuthentication({axios, navigationMock})).toBe(true);
    });

    test("not logged in", async () => {
        axios.get.mockResolvedValue({data : {auth : false }});
        const navigationMock = jest.fn();
        expect(await checkAuthentication({axios, navigationMock})).toBe(false);
    })
})