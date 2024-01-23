import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../StateStoreManagement/StateStoreManagement";

export default function Signup() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });
  const Navigate = useNavigate();
  const { storeTokenInLS } = useAuth();

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "phone") {
      value = parseInt(value);
    }

    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    const res = await response.json();
    console.log(res);
    if (response.ok) {
      storeTokenInLS(res.token);
      //localStorage.setItem("token", res.token);
      setUser({ username: "", email: "", phone: "", password: "" });
      Navigate("/");
    } else {
      alert(res.extraDetails ? res.extraDetails : res.message);
    }
  };

  return (
    <>
      <section>
        <main>
          <div>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  name="username"
                  placeholder="username"
                  id="username"
                  required
                  autoComplete="off"
                  value={user.username}
                  onChange={handleInput}
                />
              </div>

              <div>
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  name="email"
                  placeholder="email"
                  id="email"
                  required
                  autoComplete="off"
                  value={user.email}
                  onChange={handleInput}
                />
              </div>

              <div>
                <label htmlFor="phone">Phone</label>
                <input
                  type="number"
                  name="phone"
                  placeholder="phone"
                  id="phone"
                  required
                  autoComplete="off"
                  value={user.phone}
                  onChange={handleInput}
                />
              </div>

              <div>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  id="password"
                  required
                  autoComplete="off"
                  value={user.password}
                  onChange={handleInput}
                />
              </div>
              <div>
                <button type="submit">Submit</button>
              </div>
            </form>
          </div>
        </main>
      </section>
    </>
  );
}
