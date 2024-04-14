import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchFromLS, removeFromLS } from "./localStorage.util";

import { AppContext } from "../App";

export const USER_ROLE = {
  ADMIN: 0,
  NURSE: 1,
  PATIENT: 2,
};

export const user = {
  entityId: "",
  userId: "",
  roleId: "",
  email: "",
  token: "",
};

export default function useAuth() {
  const { isLoggedIn } = useContext(AppContext);

  const location = useLocation();
  const openApis = ["/", "/login", "/register"];

  const [user, setUser] = useState({
    entityId: "",
    userId: "",
    roleId: "",
    email: "",
    token: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    const retrievedUser = fetchFromLS("user");

    console.log(openApis.includes(location.pathname));
    if (retrievedUser) {
      setUser(retrievedUser);
    } else if (!openApis.includes(location.pathname)) {
      navigate("/login");
    }
  }, [isLoggedIn]);

  const removeUser = () => {
    removeFromLS("user");
  };

  return { user, removeUser };
}
