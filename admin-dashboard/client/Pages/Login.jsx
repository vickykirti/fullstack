import React from "react";
import { useState } from "react";
import { useAuth } from "../StateStoreManagement/StateStoreManagement";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { storeTokenInLS } = useAuth();
  const Navigate = useNavigate();

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      const res = await response.json();
      storeTokenInLS(res.token);
      if (response.ok) {
        //localStorage.setItem("token", res.token);
        //alert("Login Successfull");
        toast.success("Login Successfull");
        Navigate("/");
        setUser({
          email: "",
          password: "",
        });
      } else {
        toast.error(res.extraDetails ? res.extraDetails : res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <section>
        <main>
          <div>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  name="email"
                  placeholder="email"
                  id="email"
                  required
                  //autoComplete="off"
                  value={user.email}
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
