import React, { useContext, useEffect, useState } from "react";

import { fetchFromLS } from "../utils/localStorage.util";
import Button from "./Button";

import { Link } from "react-router-dom";
import { AppContext } from "../App";

export default function Navbar() {
  const { isLoggedIn } = useContext(AppContext);

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
            <li className="v-nav-item">
              <img src="/images/user.png" width="20" height="20" />
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
