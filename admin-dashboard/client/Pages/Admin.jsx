import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { FaUsers } from "react-icons/fa";
import { IoIosContacts } from "react-icons/io";
import { FaServicestack } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";

export default function Admin() {
  return (
    <div>
      <ul>
        <li style={{ color: "white" }}>
          <NavLink to="/admin/users">
            <FaUsers />
            Users
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/contacts">
            <IoIosContacts />
            ContactsUsers
          </NavLink>
        </li>
        <li>
          <NavLink to="/services">
            <FaServicestack />
            Services
          </NavLink>
        </li>
        <li>
          <NavLink to="/">
            <FaHome />
            Home
          </NavLink>
        </li>
      </ul>
      Admin
      <Outlet />
    </div>
  );
}
