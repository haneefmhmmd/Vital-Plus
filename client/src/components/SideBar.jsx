import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import useAuth from "../utils/useAuth";

export default function SideBar() {
  const { user } = useAuth();
  const [activeNavItem, setActiveNavItem] = useState("/");
  const location = useLocation();

  useEffect(() => {
    setActiveNavItem(location.pathname);
  }, [location.pathname]);

  return (
    <aside className="sidebar bg-white border-end shadow-sm">
      <nav className="sidebar-nav">
        <Link
          to={user.roleId == 1 ? "/nurse" : "/patient"}
          className={`btn btn-sm btn-sidebar text-start ${activeNavItem == "/patient" || activeNavItem == "/nurse"
            ? "active"
            : ""
            }`}
          id="Dashboard"
        >
          <img src="/images/dashboard.png" alt="image of book" />
          <span>Dashboard</span>
        </Link>
        {user.roleId == 1 && (
          <Link
            to="/nurse/add-patient"
            className={`btn btn-sm btn-sidebar text-start ${activeNavItem == "/nurse/add-patient" ? "active" : ""
              }`}
            id="add-patient"
          >
            <img src="/images/add-patient.png" alt="image of members" />
            <span>Add Patient</span>
          </Link>
        )}
        {user.roleId == 2 && (
          <Link
            to="/fitness"
            className={`btn btn-sm btn-sidebar text-start ${activeNavItem == "/nurse/add-patient" ? "active" : ""
              }`}
            id="fitness"
          >
            <img src="/images/publishers.png" alt="image of members" />
            <span>Fitness</span>
          </Link>
        )}
        <Link
          to="/add-vital"
          className={`btn btn-sm btn-sidebar text-start ${activeNavItem == "/add-vital" ? "active" : ""
            }`}
          id="add-vital"
        >
          <img src="/images/vital.png" alt="image of publishers" />
          <span>Add Vital</span>
        </Link>
        <Link
          to="/manage-account"
          className={`btn btn-sm btn-sidebar text-start ${activeNavItem == "/manage-account" ? "active" : ""
            }`}
          id="account"
        >
          <img src="/images/account.png" alt="image of borrow book" />
          <span>Account</span>
        </Link>
      </nav>
    </aside>
  );
}
