import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "./styles/index.scss";

import Navbar from "./components/NavBar";
import SideBar from "./components/SideBar";
import Auth from "./pages/Auth";
import Books from "./pages/Books";
import Home from "./pages/Home";
import AddPatient from "./pages/nurse-dashboard/AddPatient";
import AddVital from "./pages/nurse-dashboard/AddVital";
import NurseDashboard from "./pages/NurseDashboard";

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
            <Route path="/app" element={<Books />} />
            <Route path="/app/nurse" element={<NurseDashboard />} />
            <Route path="/add-patient" element={<AddPatient />} />
            <Route path="/add-vital" element={<AddVital />} />
          </Routes>
        </section>
      </main>
    </>
  );
}

export default App;
