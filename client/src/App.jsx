import "@fontsource/roboto/400.css";
import React from "react";
import { Route, Routes } from "react-router-dom";
import "./assets/css/App.css";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />}></Route>

      <Route path="/signin" element={<SignIn />}></Route>

      <Route path="/signup" element={<SignUp />}></Route>
    </Routes>
  );
}

export default App;
