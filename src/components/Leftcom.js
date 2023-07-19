import React, { useContext, useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { convfetchApi } from "../Services/conversation.service";
import CentralState from "../context/CentralContext";
import AuthState from "../auth/Authcontext";

const Leftcom = () => {
  const {
    setSelectedUSer,
    conversations,
    setConversations,
    messages,
    setMessages,
    selectedConversationId,
    setSelectedConversationId,
    isConversationsFetched,
    setIsConversationFetched,
  } = useContext(CentralState);

  const { loggedinUserDetails } = useContext(AuthState);

  const token = localStorage.getItem("token");

  const fetchConversation = async (token) => {
    const response = await convfetchApi(1, 100, token);
    if (response.isSuccess) {
      const conversations = response.data.conversations;
      const conversationIds = conversations.map(
        (conversation) => conversation._id
      );
      console.log("Conversation IDs:", conversationIds);
      setConversations(conversations);
      setIsConversationFetched(true);
    } else {
      console.error(response.errorMessage);
    }
  };

  useEffect(() => {
    if (!isConversationsFetched) {
      fetchConversation(token);
    }
  }, [isConversationsFetched]);

  const handleUserClick = async (conversationId) => {
    const selectedConversation = conversations.find(
      (conversation) => conversation._id === conversationId
    );
    const idd = selectedConversation._id;
    setSelectedConversationId(conversationId);
    console.log("cid:", idd);
    const selecteUser = selectedConversation.users.find(
      (user) => user.name !== loggedinUserDetails.uname
    );
    setSelectedUSer(selecteUser);
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  return (
    <div>
      <div className="leftcomheader">
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={1}>
            <Grid item xs={2.5}>
              <Stack direction="row" spacing={2}>
                <Avatar
                  alt={
                    loggedinUserDetails.uname
                      ? loggedinUserDetails.uname.charAt(0)
                      : ""
                  }
                  sx={{
                    width: 60,
                    height: 60,
                    fontSize: "35px",
                    fontFamily: "Times New Roman",
                  }}
                >
                  {loggedinUserDetails.uname
                    ? loggedinUserDetails.uname.charAt(0)
                    : ""}
                </Avatar>
              </Stack>
            </Grid>
            <Grid item xs={9} container spacing={2}>
              <Grid item xs={11}>
                <Stack direction="row" spacing={2}>
                  <div style={{ paddingTop: "16px" }}>
                    <div className="user-name">{loggedinUserDetails.uname}</div>
                  </div>
                </Stack>
              </Grid>
            </Grid>
          </Grid>
        </Box>
        <Typography
          variant="h6"
          sx={{
            textAlign: "left",
            fontFamily: "Times New Roman",
            fontSize: "15px",
            padding: "5px",
          }}
        >
          Ping-ID: {loggedinUserDetails.upingId}
        </Typography>
      </div>
      <br />
      <br />
      <div className="leftcombody">
        <Stack direction="column" spacing={1}>
          {conversations.map((conversation) => {
            const showUser = conversation.users?.find(
              (user) => user.name !== loggedinUserDetails.uname
            );
            if (!showUser) return null;
            return (
              <Grid
                container
                spacing={1}
                key={conversation._id}
                onClick={() => handleUserClick(conversation._id)}
                sx={{
                  boxShadow: "0px 2px 4px rgba(0, 0, 255, 0.25)",
                  backgroundColor: "rgba(0, 0, 255, 0.1)",
                }}
              >
                <Grid item xs={1.5}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    {showUser && showUser.name && (
                      <Avatar
                        style={{ marginLeft: "3px" }}
                        alt={showUser.name ? showUser.name.charAt(0) : ""}
                      >
                        {showUser.name.charAt(0)}
                      </Avatar>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={10}>
                  <Stack direction="row" spacing={0} alignItems="center">
                    {showUser && showUser.name && (
                      <div className="name-contacts">{showUser.name}</div>
                    )}
                  </Stack>
                </Grid>
              </Grid>
            );
          })}
        </Stack>
      </div>
    </div>
  );
};

export default Leftcom;
