import React, { createContext, useState, useContext, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState("");
  const [services, setServices] = useState("");
  const authorizationToken = `Bearer ${token}`;
  //console.log(token);

  useEffect(() => {
    userAuthentication();
    getServices();
  }, [token]);

  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
    return localStorage.setItem("token", serverToken);
  };

  const Logoutuser = () => {
    setToken("")
    return localStorage.removeItem("token");
  };

  const isLogged = !!token;
  //const isAdmin = !!user.isAdmin;
  //console.log(`Store: ${isLogged}`);
  //console.log(`from store ${isAdmin}`)
  //console.log(`isLogged ${isLogged}`)

  const userAuthentication = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/user", {
        method: "GET",
        headers: { Authorization: authorizationToken },
      });
      console.log("Authy");
      if (response.ok) {
        const data = await response.json();
        setUser(data.userData);
        console.log(`Authentication Successfull: ${user}`);
      }
    } catch (error) {
      console.log(`userAuthentication from Store Management Failed: ${error}`);
    }
  };

  const getServices = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/service", {
        method: "GET",
      });
      if (response.ok) {
        const res = await response.json();
        setServices(res.message);
      }
    } catch (error) {
      console.log(`Services Page not found ${error}`);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        storeTokenInLS,
        Logoutuser,
        isLogged,
        user,
        services,
        authorizationToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the provider");
  }
  return authContextValue;
};
