import React from "react";
import axios from "axios";
import { authContext } from "./App";
import { useNavigate } from "react-router-dom";

function HomePage(){
    const [signedIn, setSignedIn] = React.useContext(authContext);
    const navigation = useNavigate();
    return(
        <h1>Home Page</h1>
    )
}

export default HomePage;