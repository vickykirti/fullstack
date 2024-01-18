import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const PrivateComponents = () => {
  let auth = localStorage.getItem("user");
  return auth ? <Outlet /> : Navigate("/signup");
};

export default PrivateComponents;