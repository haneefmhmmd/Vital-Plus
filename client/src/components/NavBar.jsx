import React, { useContext, useEffect, useState } from "react";

import Button from "./Button";

import { Link, useLocation } from "react-router-dom";
import { AppContext } from "../App";
import useAuth from "../utils/useAuth";

export default function Navbar() {
  const { user } = useAuth();
  const { isLoggedIn, setIsLoggedIn } = useContext(AppContext);
  const location = useLocation();
  useEffect(() => {
    console.log("isUserPresent", user.token);
    if (user && user.token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [user, location.pathname]);

  const { removeUser } = useAuth();
  const handleLogout = () => {
    removeUser();
    setIsLoggedIn(false);
  };

  return (
    <nav className="v-navbar">
      <div>
        <Link className="v-navbar-brand" to="/">
          <img
            className="v-nav-logo"
            src="/images/logo/logofull.png"
            height={32}
          />
        </Link>
        <ul className="v-navbar-nav">
          {!isLoggedIn && (
            <>
              <li className="v-nav-item">
                <Button
                  variant="secondary"
                  label="Register"
                  size="sm"
                  elementType="link"
                  href="/register"
                />
              </li>
              <li className="v-nav-item">
                <Button
                  label="Login"
                  size="sm"
                  elementType="link"
                  href="/login"
                />
              </li>
            </>
          )}
          {isLoggedIn && (
            <>
              <li className="v-nav-item">
                <Link
                  className="v-navbar-link"
                  to={user.roleId == 1 ? "/nurse" : "/patient"}
                >
                  Dashboard
                </Link>
              </li>
              <li className="v-nav-item">
                <Button
                  variant="secondary"
                  label="Logout"
                  size="sm"
                  onClick={handleLogout}
                />
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
