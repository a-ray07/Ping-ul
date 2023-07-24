import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setToken, signInApi, validateToken } from "../Services/auth.services";

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

  const handleSignIn = async (formData) => {
    try {
      const token = await setToken(formData);
      const response = await signInApi(formData);
      if (response.isSuccess) {
        localStorage.setItem("token", token);
        const { name, pingId, _id, email } = response.data;
        setLoggedInUserDetails({
          uname: name,
          upingId: pingId,
          uid: _id,
          email: email,
        });
        setIsLoggedIn(true);
        console.log("Signin Successful:", response);
        navigate("/chatpage");
      }
    } catch (error) {
      console.error("Signin Error:", error);
    }
  };

  const checkLoggedInStatus = () => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
    console.log("isLoggedIn: ", isLoggedIn);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setLoggedInUserDetails({
      uname: "",
      upingId: "",
      uid: "",
      email: "",
    });
    console.log("logout", isLoggedIn);
    navigate("/");
  };

  return (
    <AuthState.Provider
      value={{
        navigate,
        isLoggedIn,
        setIsLoggedIn,
        checkLoggedInStatus,
        handleLogout,
        loggedinUserDetails,
        handleSignIn,
      }}
    >
      {children}
    </AuthState.Provider>
  );
};

export default AuthState;
