import React, { useEffect, useState } from "react";
import { useAuth } from "../StateStoreManagement/StateStoreManagement";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function AdminUpdate() {
  const params = useParams();
  const { authorizationToken } = useAuth();
  const [data, setData] = useState({
    username: "",
    email: "",
    phone: "",
  });

  const uploadUserData = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/auth/${params.id}`,
        {
          method: "GET",
          headers: {
            Authorization: authorizationToken,
          },
        }
      );
      const data = await response.json();
      //console.log(`Users data ${data}`);
      setData(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    uploadUserData();
  }, []);

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    //In my first fullstack, when i didn't spread the previous data, i had
    //to use useCallback instead. What was the purpose, because was it heavy?

    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5000/api/auth/update/${params.id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: authorizationToken,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        toast.success("Updated Successfully");
      } else {
        toast.error("Update Failed");
      }
      
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <section className="section-contact">
        <div className="contact-content container">
          <h1 className="main-heading">contact us</h1>
        </div>
        <div>
          <section className="section-form">
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username">username</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  autoComplete="off"
                  value={data.username}
                  onChange={handleInput}
                  required
                />
              </div>

              <div>
                <label htmlFor="email">email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="off"
                  value={data.email}
                  onChange={handleInput}
                  required
                />
              </div>

              <div>
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="phone"
                  name="phone"
                  id="phone"
                  autoComplete="off"
                  value={data.phone}
                  onChange={handleInput}
                  required
                />
              </div>

              <div>
                <button type="submit">submit</button>
              </div>
            </form>
          </section>
        </div>
      </section>
    </div>
  );
}
