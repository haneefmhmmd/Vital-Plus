import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "./styles/index.scss";

import Navbar from "./components/NavBar";
import SideBar from "./components/SideBar";
import Auth from "./pages/Auth";
import Books from "./pages/Books";
import Borrow from "./pages/Borrow";
import Home from "./pages/Home";
import Members from "./pages/Members";
import Publishers from "./pages/Publishers";

const endpoints = ["/", "/login", "/register"];

function App() {
  const [isApp, setIsApp] = useState(false);

  const location = useLocation();

  useEffect(() => {
    setIsApp(!endpoints.includes(location.pathname));
  }, [location.pathname]);

  return (
    <>
      <Navbar />
      <main className="main-container">
        {isApp && <SideBar />}
        <section className="page-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Auth />} />
            <Route path="/register" element={<Auth />} />
            <Route path="/books" element={<Books />} />
            <Route path="/members" element={<Members />} />
            <Route path="/publishers" element={<Publishers />} />
            <Route path="/borrow" element={<Borrow />} />
          </Routes>
        </section>
      </main>
    </>
  );
}

export default App;
