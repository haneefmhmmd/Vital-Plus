import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function SideBar() {
  const [activeNavItem, setActiveNavItem] = useState("/");
  const location = useLocation();

  useEffect(() => {
    setActiveNavItem(location.pathname);
  }, [location.pathname]);

  return (
    <aside className="sidebar bg-white border-end shadow-sm">
      <nav className="sidebar-nav">
        <Link
          to="/"
          className={`btn btn-sm btn-sidebar text-start ${
            activeNavItem == "/" || activeNavItem == "/books" ? "active" : ""
          }`}
          id="Books"
        >
          <img src="/images/books.png" alt="image of book" />
          <span>Books</span>
        </Link>
        <Link
          to="/members"
          className={`btn btn-sm btn-sidebar text-start ${
            activeNavItem == "/members" ? "active" : ""
          }`}
          id="Members"
        >
          <img src="/images/members.png" alt="image of members" />
          <span>Members</span>
        </Link>
        <Link
          to="/publishers"
          className={`btn btn-sm btn-sidebar text-start ${
            activeNavItem == "/publishers" ? "active" : ""
          }`}
          id="Publishers"
        >
          <img src="/images/publishers.png" alt="image of publishers" />
          <span>Publishers</span>
        </Link>
        <Link
          to="/borrow"
          className={`btn btn-sm btn-sidebar text-start ${
            activeNavItem == "/borrow" ? "active" : ""
          }`}
          id="Borrow"
        >
          <img src="/images/borrow-book.png" alt="image of borrow book" />
          <span>Borrow</span>
        </Link>
      </nav>
    </aside>
  );
}
