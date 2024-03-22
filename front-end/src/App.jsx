import React from "react";
import HomePage from "./features/Home Page/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Canvas from "./features/Lobby/Canvas";
import Lobby from "./features/Lobby/Lobby";
import CompleteProfile from "./features/Authentication/CompleteProfile";
import Store from "./features/Store/Store";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginAndRegister from "./features/Authentication/LoginAndRegister";
import ValidAuthentication from "./components/ValidAuthentication";

// Create context to store authentication
/**
 * Context to store authentication state
 */
export const authContext = React.createContext();

/**
 * Root component to load the entire application
 * @returns {React.Component} The App component to display pages
 */
function App() {
  // Create state to be apssed into contxt
  const [signedIn, setSignedIn] = React.useState({ auth: false });
  return (
    <authContext.Provider value={[signedIn, setSignedIn]}>
      {/* Define routes for different pages */}
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<LoginAndRegister defaultState="register" />}
          />
          <Route
            path="/login"
            element={<LoginAndRegister defaultState="login" />}
          />
          <Route
            path="/register"
            element={<LoginAndRegister defaultState="register" />}
          />
          <Route
            path="/home"
            element={
              <ValidAuthentication>
                <HomePage />
              </ValidAuthentication>
            }
          />
          <Route path="/lobby/:lobbyId" element={<Lobby />} />
          <Route path="/canvas" element={<Canvas />} />
          <Route path="/complete-profile" element={<CompleteProfile />} />
          <Route path="/store" element={<Store />} />
        </Routes>
      </BrowserRouter>
    </authContext.Provider>
  );
}

export default App;
