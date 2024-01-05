import React from "react";
import RegisterPage from "./RegisterPage";
import LoginPage from "./LoginPage";
import HomePage from "./HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Canvas from "./Canvas";
import Lobby from "./Lobby";
import CompleteProfile from "./CompleteProfile";
import Store from "./Store";

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
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/home" element={<HomePage />} />
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
