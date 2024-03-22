import React, { useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { authContext } from "../App";
import checkAuthentication from "./CheckAuthentication";

function ValidAuthentication({ children }) {
  const [signedIn, setSignedIn] = useContext(authContext);
  const navigation = useNavigate();
  const location = useLocation();

  useEffect(() => {
    async function ensureLogin() {
      const response = await checkAuthentication({ axios });
      if (response.auth) {
        if (!response.username) {
          navigation("/complete-profile");
        }
        setSignedIn({
          auth: true,
          username: response.username,
          points: response.points,
          tools: response.tools,
          profilePicture: response.profilePicture,
          purchasedProfilePicture: response.purchasedProfilePicture,
        });
      } else {
        // If not signed in, navigate them to the /login page
        navigation("/login");
      }
    }
    ensureLogin();
  }, []);

  return <>{signedIn.auth && children}</>;
}

export default ValidAuthentication;
