import React, { useEffect } from "react";
import PictureSelector from "./PictureSelector";
import checkAuthentication from "./checkAuthentication";
import { authContext } from "./App";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ModifyPicturePage() {
  const navigation = useNavigate();
  const [signedIn, setSignedIn] = React.useContext(authContext);
  const [isLoading, setIsLoading] = React.useState(true);
  useEffect(() => {
    async function ensureLogin() {
      const response = await checkAuthentication({ axios });
      if (response.auth) {
        setSignedIn({
          auth: true,
          username: response.username,
          points: response.points,
          tools: response.tools,
          profilePicture: response.profilePicture,
          purchasedProfilePicture: response.purchasedProfilePicture,
        });
        setIsLoading(false);
      } else {
        // If not signed in, navigate them to the /login page
        navigation("/login");
      }
    }
    ensureLogin();
  }, []);

  return (
    <div>
      {isLoading ? (
        <p>Fetching profile information</p>
      ) : (
        <PictureSelector
          currentPicture={`../${signedIn.profilePicture}`}
          availablePictures={signedIn.purchasedProfilePicture}
        />
      )}
    </div>
  );
}

export default ModifyPicturePage;
