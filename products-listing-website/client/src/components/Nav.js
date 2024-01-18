import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
   const auth = localStorage.getItem("user")
   const navigate = useNavigate();
   const logout = () => {
    localStorage.clear();
    navigate("/signup")
   }
   return (
    <div className="nav-ul">
        <img className="mainlogo" src="https://images-platform.99static.com//_-efnTC02kmxV6Dicoa4bjSMSjs=/516x3011:1255x3750/fit-in/500x500/99designs-contests-attachments/66/66702/attachment_66702512" alt="" />
      {auth ? <ul>
        <li><Link to="/">Products</Link></li>
        <li><Link to="/add">Add Product</Link></li>
        {/* <li><Link to="/update">Update Product</Link></li> */}
        <li><Link to="/profile">Profile</Link></li>
        <li><Link onClick={logout} to="/signup">Logout ({JSON.parse(auth).name})</Link></li>
        </ul>
        : <ul>
        <li><Link to="/signup">Signup</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>}
    </div>
  )
};

export default Nav;