import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthState = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();

    const [isLoggedIn, setIsLoggedIn] = useState(false);




    const checkLoggedInStatus = () => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);
        console.log("isLoggedIn: ", isLoggedIn);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("User id:")
        localStorage.removeItem("name")
        setIsLoggedIn(false);
        console.log("logout", isLoggedIn);
        navigate("/");
    };

    return <AuthState.Provider value={{ isLoggedIn, setIsLoggedIn, checkLoggedInStatus, handleLogout, navigate }}>{children}</AuthState.Provider>

};

export default AuthState;
