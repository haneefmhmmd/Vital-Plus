import React from "react";
import { Routes, Route } from 'react-router-dom';
import '@fontsource/roboto/400.css';
import Home from "./Home";
import '../assets/css/App.css';
import SignIn from "./SignIn";
import SignUp from "./SignUp";

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
