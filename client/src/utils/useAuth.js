import React, { useEffect, useState } from "react";
import { fetchFromLS } from "./localStorage.util";

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
  const [user, setUser] = useState({
    entityId: "",
    userId: "",
    roleId: "",
    email: "",
    token: "",
  });

  useEffect(() => {
    const retrievedUser = fetchFromLS("user");

    if (retrievedUser) {
      setUser(retrievedUser);
    }
  }, []);
  return { user };
}
