import React from "react";

export default function Navbar() {
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
          <li className="v-nav-item">
            <img src="/images/user.png" width="20" height="20" />
          </li>
        </ul>
      </div>
    </nav>
  );
}
