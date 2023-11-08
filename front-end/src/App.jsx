import React from "react";
import RegisterPage from "./RegisterPage";
import LoginPage from "./LoginPage";
import HomePage from "./HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Canvas from "./Canvas";

export const authContext = React.createContext();

function App() {
  const [signedIn, setSignedIn] = React.useState({auth: false});
  return (
    <authContext.Provider value={[signedIn, setSignedIn]}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="canvas" element={<Canvas />} />
        </Routes>
      </BrowserRouter>
    </authContext.Provider>
    
  );
}

export default App;
