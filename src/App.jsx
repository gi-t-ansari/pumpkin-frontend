import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { APP_URL } from "./config";
import Signup from "./pages/Signup";
import Chat from "./pages/Chat";
// import { Chat, SignUp } from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={APP_URL.SIGNUP} element={<Signup />} />
        <Route path={APP_URL.CHAT} element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
