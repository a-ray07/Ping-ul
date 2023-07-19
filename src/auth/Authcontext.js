import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateToken } from "../Services/auth.services";

const AuthState = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedinUserDetails, setLoggedInUserDetails] = useState({
    uname: "",
    upingId: "",
    uid: "",
    email: "",
  });

  const checkLoggedInStatus = () => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
    console.log("isLoggedIn: ", isLoggedIn);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("User id:");
    localStorage.removeItem("name");
    setIsLoggedIn(false);
    console.log("logout", isLoggedIn);
    navigate("/");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      validateToken(token)
        .then((result) => {
          if (result.isSuccess) {
            const { name, pingId, _id, email } = result.data;
            setLoggedInUserDetails({
              uname: name,
              upingId: pingId,
              uid: _id,
              email: email,
            });
            setIsLoggedIn(true);
          } else {
            console.log("Token not valid");
            setIsLoggedIn(false);
          }
        })
        .catch((error) => {
          console.error("Token validation error", error);
          setIsLoggedIn(false);
        });
    } else {
      console.log("Token not found");
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <AuthState.Provider
      value={{
        navigate,
        isLoggedIn,
        setIsLoggedIn,
        checkLoggedInStatus,
        handleLogout,
        loggedinUserDetails,
      }}
    >
      {children}
    </AuthState.Provider>
  );
};

export default AuthState;
