import React, { useEffect, useState } from "react";

import { fetchFromLS } from "../utils/localStorage.util";
import Button from "./Button";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const accessToken = fetchFromLS("access_token");
    if (accessToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [isLoggedIn]);

  return (
    <nav className="v-navbar">
      <div>
        <a className="v-navbar-brand" href="/">
          <img
            className="v-nav-logo"
            src="/images/logo/logofull.png"
            height={32}
          />
        </a>
        <ul className="v-navbar-nav">
          {!isLoggedIn && (
            <>
              <li className="v-nav-item">
                <Button
                  variant="secondary"
                  label="Register"
                  size="sm"
                  elementType="a"
                  href="/register"
                />
              </li>
              <li className="v-nav-item">
                <Button label="Login" size="sm" elementType="a" href="/login" />
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
