import React, { useEffect, useState } from "react";
import { useAuth } from "../StateStoreManagement/StateStoreManagement";
import { toast } from "react-toastify";

export default function AdminContacts() {
  const { authorizationToken } = useAuth();
  const [data, setData] = useState([]);

  const getContacts = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/getcontacts",
        {
          method: "GET",
          headers: {
            Authorization: authorizationToken,
          },
        }
      );
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteContactById = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/auth/contacts/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: authorizationToken,
          },
        }
      );
      if (response.ok) {
        toast.success("Contact Deleted Sucessfully!");
        getContacts();
      } else {
        toast.error("Contact Delete Failed!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getContacts();
  }, []);

  return (
    <>
      <h2>Contact Users</h2>
      {data.map((currdata, index) => {
        const { username, email, message, _id } = currdata;

        return (
          <div key={index}>
            <p>{username}</p>
            <p>{email}</p>
            <p>{message}</p>
            <button
              onClick={() => {
                deleteContactById(_id);
              }}
            >
              Delete
            </button>{" "}
          </div>
        );
      })}
    </>
  );
}
