import React, {useEffect} from "react";
import axios from "axios";
import { authContext } from "./App";
import { useNavigate } from "react-router-dom";

function HomePage(){
    const [signedIn, setSignedIn] = React.useContext(authContext);
    const navigation = useNavigate();

    useEffect(() => {
        async function checkAuthentication(){
            const response = await axios.get("/auth/check-auth");
            if (response.data.auth){
                console.log("Signed In");
            }
        }
    })

    return(
        <h1>Home Page</h1>
    )
}

export default HomePage;