import React, { createContext, useState } from "react";

const CentralState = createContext();

export const CentralStateProvider = ({ children }) => {
  const [messages, setMessages] = useState({});
  const [inputMessage, setInputMessage] = useState("");
  const [conversations, setConversations] = useState([]);
  const [selectedConversationId, setSelectedConversationId] = useState(null);
  const [selectedUser, setSelectedUSer] = useState(null);
  const [addNewContactName, setAddNewContactName] = useState([]);
  const [newConversation, setNewConversation] = useState(null);
  const [isConversationsFetched, setIsConversationFetched] = useState(false);

  return (
    <CentralState.Provider
      value={{
        newConversation,
        setNewConversation,
        addNewContactName,
        setAddNewContactName,
        selectedUser,
        setSelectedUSer,
        selectedConversationId,
        setSelectedConversationId,
        conversations,
        setConversations,
        messages,
        setMessages,
        inputMessage,
        setInputMessage,
        isConversationsFetched,
        setIsConversationFetched,
      }}
    >
      {children}
    </CentralState.Provider>
  );
};

export default CentralState;
