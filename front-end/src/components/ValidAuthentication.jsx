import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { authContext } from "../App";
import checkAuthentication from "./CheckAuthentication";

/**
 * Wrap child componeonts within this to ensure that users are signed in, otherwise they are navigated to the login page
 * @param {React.ReactNode} props.children - Children contais the components to render if the user is signed in
 * @returns {React.ReactNode} - Child component is rendered if valid authentication
 */
function ValidAuthentication({ children }) {
  const [signedIn, setSignedIn] = useContext(authContext);
  const [loading, setLoading] = React.useState(true);
  const navigation = useNavigate();

  useEffect(() => {
    /**
     * Communicate with back-end server to ensure the user is authenticated
     */
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
    ensureLogin().then(setLoading(false));
  }, []);

  return <>{signedIn.auth && !loading && children}</>;
}

export default ValidAuthentication;
