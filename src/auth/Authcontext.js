import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthState = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [messages, setMessages] = useState([])
    const [inputMessage, setInputMessage] = useState('')
    const [name, setName] = useState('')
    const [pingId, setPingId] = useState('')
    const [conversations, setConversations] = useState([])
    const [selectedConversationId, setSelectedConversationId] = useState(null)
    const [selectedUser, setSelectedUSer] = useState(null)
    const [addNewContactName, setAddNewContactName] = useState([])



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

    return <AuthState.Provider value={{ addNewContactName, setAddNewContactName, selectedUser, setSelectedUSer, selectedConversationId, setSelectedConversationId, conversations, setConversations, pingId, setPingId, name, setName, navigate, isLoggedIn, setIsLoggedIn, handleLogout, checkLoggedInStatus, messages, setMessages, inputMessage, setInputMessage }}>{children}</AuthState.Provider>

};

export default AuthState;
