import React, { createContext, useState } from "react";

const CentralState = createContext()

export const CentralStateProvider = ({ children }) => {
    const [messages, setMessages] = useState({})
    const [inputMessage, setInputMessage] = useState('')
    const [name, setName] = useState('')
    const [pingId, setPingId] = useState('')
    const [conversations, setConversations] = useState([])
    const [selectedConversationId, setSelectedConversationId] = useState(null)
    const [selectedUser, setSelectedUSer] = useState(null)
    const [addNewContactName, setAddNewContactName] = useState([])
    const [loggedInUserName, setLoggedInUserName] = useState('')
    const [loggedInUserId, setLoggedInUserId] = useState('')
    const [newConversation, setNewConversation] = useState(null);


    return <CentralState.Provider value={{ newConversation, setNewConversation, loggedInUserId, setLoggedInUserId, loggedInUserName, setLoggedInUserName, addNewContactName, setAddNewContactName, selectedUser, setSelectedUSer, selectedConversationId, setSelectedConversationId, conversations, setConversations, messages, setMessages, inputMessage, setInputMessage, name, setName, pingId, setPingId, }}>{children}</CentralState.Provider>

}

export default CentralState