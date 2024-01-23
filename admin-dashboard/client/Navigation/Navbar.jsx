import React, { useState } from "react";
import { useAuth } from "../StateStoreManagement/StateStoreManagement";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const { isLogged, user } = useAuth();
  //console.log(`Navbar: ${isLogged}`);
  const admin = user.isAdmin;
  console.log(isLogged, admin);

  return (
    <div className="container">
      <nav>
        <ul>
          {isLogged ? (
            <>
              <li>
                <NavLink to="/" style={{ color: "white" }}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" style={{ color: "white" }}>
                  About
                </NavLink>
              </li>
              <li>
                <NavLink to="/services" style={{ color: "white" }}>
                  Services
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" style={{ color: "white" }}>
                  Contact
                </NavLink>
              </li>
              <li>
                <NavLink to="/logout" style={{ color: "white" }}>
                  Log Out
                </NavLink>
              </li>
              {admin && (
                <li>
                  <NavLink to="/admin" style={{ color: "white" }}>
                    Admin
                  </NavLink>
                </li>
              )}
            </>
          ) : (
            <>
              <li>
                <NavLink to="/Signup" style={{ color: "white" }}>
                  Sign Up
                </NavLink>
              </li>
              <li>
                <NavLink to="/login" style={{ color: "white" }}>
                  Log In
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
}
