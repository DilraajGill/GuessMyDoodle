import React, {useEffect} from "react";
import axios from "axios";
import { authContext } from "./App";
import { useNavigate } from "react-router-dom";
import checkAuthentication from "./checkAuthentication";

function HomePage(){
    const [signedIn, setSignedIn] = React.useContext(authContext);
    const navigation = useNavigate();

    useEffect(() => {
        async function ensureLogin(){
            const response = await checkAuthentication(axios, navigation);
        }
        ensureLogin();
    })

    return(
        <h1>Home Page</h1>
    )
}

export default HomePage;