import React from "react";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../StateStoreManagement/StateStoreManagement";

export default function Logout() {
  const { Logoutuser } = useAuth();

  useEffect(() => {
    Logoutuser();
  }, []);

  return <Navigate to="/login" />;
}
