import React, { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import {
  getmessageApi,
  personalmessageApi,
} from "../Services/messages.service";
import CentralState from "../context/CentralContext";
import AuthState from "../context/Authcontext";

const ChatContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  overflowY: "auto",
  maxHeight: "500px",
}));

const ChatMessage = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  display: "flex",
  flexDirection: "column",
  "&.user-a": {
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  "&.user-b": {
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
}));

const ChatInputContainer = styled(Stack)(({ theme }) => ({
  position: "fixed",
  bottom: theme.spacing(2),
  left: theme.spacing(2),
  right: theme.spacing(2),
  background: "#fff",
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
  width: "640px",
}));

const Middlecom = () => {
  const {
    messages,
    setMessages,
    inputMessage,
    setInputMessage,
    selectedConversationId,
    handleSendMessage,
  } = useContext(CentralState);
  const [showMessages, setShowMessages] = useState([]);

  const { loggedinUserDetails } = useContext(AuthState);

  const handleInputChange = (event) => {
    setInputMessage(event.target.value);
  };

  const handleSendMessageText = () => {
    handleSendMessage();
  };

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!selectedConversationId) {
      return;
    }
    if (Object.keys(messages).includes(selectedConversationId)) {
      setShowMessages(messages[selectedConversationId].messages);
      console.log("Mes:", showMessages);
      console.log("Mesg:", messages);
      return;
    }

    const fetchMessages = async () => {
      const res = await getmessageApi(1, 100, selectedConversationId, token);
      if (res.isSuccess) {
        setMessages((prev) => {
          prev[selectedConversationId] = res.data;
          return prev;
        });
        setShowMessages(res.data.messages);
      } else {
        console.error(res.errorMessage);
      }
    };
    fetchMessages();
  }, [selectedConversationId]);

  const MessageContent = styled(Box)(({ theme, isSent }) => ({
    backgroundColor: isSent ? "#4caf50" : "#2196f3",
    color: "#ffffff",
    padding: theme.spacing(1),
    borderRadius: theme.spacing(1),
    width: "fit-content",
  }));

  useEffect(() => {
    console.log("showMessages:", showMessages);
  }, [showMessages]);

  return (
    <Box>
      <h1 className="h1Chats">Chats</h1>
      <ChatContainer elevation={0}>
        {showMessages &&
          Object.keys(showMessages).map((key, index) => {
            const message = showMessages[key];
            return (
              <ChatMessage
                key={index}
                className={
                  message.sender_id === loggedinUserDetails.uid
                    ? "user-b"
                    : "user-a"
                }
              >
                <MessageContent
                  isSent={message.sender_id === loggedinUserDetails.uid}
                >
                  <Typography variant="body1">{message.text}</Typography>
                </MessageContent>
              </ChatMessage>
            );
          })}
      </ChatContainer>

      <ChatInputContainer
        style={{ marginLeft: "400px" }}
        direction="row"
        spacing={2}
        alignItems="center"
      >
        <TextField
          fullWidth
          placeholder="Type a message..."
          value={inputMessage}
          onChange={handleInputChange}
        />
        <SendIcon
          style={{ fontSize: "2.2rem" }}
          color="primary"
          onClick={handleSendMessageText}
        />
      </ChatInputContainer>
    </Box>
  );
};

export default Middlecom;
