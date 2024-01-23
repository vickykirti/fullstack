import React, { useEffect, useState } from "react";
import { useAuth } from "../StateStoreManagement/StateStoreManagement";
import { Link } from "react-router-dom";

export default function AdminUsers() {
  const { authorizationToken } = useAuth();
  const [users, setUsers] = useState();

  // console.log(authorizationToken)
  const getUsersData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/admin", {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      const data = await response.json();
      //console.log(`Users data ${data}`);
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/auth/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: authorizationToken,
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        getUsersData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsersData();
  }, []);
  return (
    <>
      <section>
        <div>Admin Panel</div>
        <div>
          <table>
            <thead>
              <tr>
                <th>Username:</th>
                <th>EmailId:</th>
                <th>Phone No:</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((data, index) => {
                return (
                  <tr key={index}>
                    <td>{data.username}</td>
                    <td>{data.email}</td>
                    <td>{data.phone}</td>
                    <td>
                      <button>
                        <Link to={`/admin/${data._id}`}>Edit</Link>
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => {
                          deleteUser(data._id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
