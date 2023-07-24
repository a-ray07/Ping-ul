import React, { useContext, useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";
import { searchUser } from "../Services/users.service";
import ChatIcon from "@mui/icons-material/Chat";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import { createconversationApi } from "../Services/conversation.service";
import CentralState from "../context/CentralContext";
import AuthState from "../context/Authcontext";

const Rightcom = () => {
  const [name, setName] = useState("");
  const [showMiddlecom, setShowMiddlecom] = useState(false);
  const [newUserId, setNewUserId] = useState("");
  const {
    selectedUser,
    setSelectedUSer,
    setIsConversationFetched,
    selectedConversationId,
  } = useContext(CentralState);

  const { loggedinUserDetails } = useContext(AuthState);

  const handleChatIconClick = async () => {
    const token = localStorage.getItem("token");
    console.log("details:", newUserId, loggedinUserDetails.uid, token);
    const users = [newUserId];
    const response = await createconversationApi(users, token);
    if (response.isSuccess) {
      console.log("Conversation created", response.data);
      setIsConversationFetched(false);
    } else {
      console.error(response.errorMessage);
    }
    setShowMiddlecom(true);
  };

  const handleSearch = async (pingId) => {
    console.log("pingId:", pingId);
    const result = await searchUser(pingId);

    if (result.isSuccess) {
      setNewUserId(result.data._id);
      setName(result.data.name);
      setSelectedUSer(null);
    } else {
      console.error(result.errorMessage);
    }
  };

  const ChatIconWrapper = styled("div")(({}) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "90px",
    height: "90px",
    borderRadius: "50%",
    backgroundColor: "rgb(188, 226, 241)",
    cursor: "pointer",
    marginLeft: "70px",
    marginTop: "60px",
    color: "blue",
    transition: "background-color 0.3s ease",
    "&:hover": {
      backgroundColor: "#bdbdbd",
    },
    "& .MuiSvgIcon-root": {
      fontSize: "2.2rem",
    },
  }));
  //Ping-UL:04e6a315-cbbc-4c15-993c-a4f08f14867f    Monica
  //Ping-UL:b24ed657-abff-4710-ad90-3c7d4b572963    Wolfs
  //Ping-UL:bec37582-0bfd-4bd2-89e6-d0172c858956    Joey
  //Ping-UL:18bf3658-9012-4876-9fad-fd72e9a98beb    Hello

  const VideoCallIconWrapper = styled("div")(({}) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "90px",
    height: "90px",
    borderRadius: "50%",
    backgroundColor: "rgb(188, 226, 241)",
    cursor: "pointer",
    marginLeft: "37px",
    marginTop: "60px",
    color: "blue",
    transition: "background-color 0.3s ease",
    "&:hover": {
      backgroundColor: "#bdbdbd",
    },
    "& .MuiSvgIcon-root": {
      fontSize: "3.2rem",
    },
  }));

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(0),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 1, 1, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(3.5)})`,
      paddingTop: "12px",
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "20ch",
        "&:focus": {
          width: "30ch",
        },
      },
    },
    "& .MuiInputBase-input::placeholder": {
      color: "inherit",
    },
    "& .MuiInputBase-root": {
      backgroundColor: "transparent",
    },
  }));

  return (
    <div>
      <form className="Searchform">
        <Search className="Search">
          <SearchIconWrapper>
            <SearchIcon className="SearchIcon" />
          </SearchIconWrapper>
          <StyledInputBase
            className="StyledInputBase"
            placeholder="Search People..."
            inputProps={{ "aria-label": "search" }}
            onChange={(event) => handleSearch(event.target.value)}
          />
        </Search>
      </form>

      <Stack
        direction="row"
        spacing={2}
        paddingLeft={"100px"}
        paddingTop={"30px"}
      >
        <Avatar
          alt={
            selectedUser
              ? selectedUser.name.charAt(0)
              : name
              ? name.charAt(0)
              : loggedinUserDetails.uname
              ? loggedinUserDetails.uname.charAt(0)
              : ""
          }
          sx={{ width: 190, height: 190, fontSize: "80px" }}
        >
          {selectedUser
            ? selectedUser.name.charAt(0)
            : name
            ? name.charAt(0)
            : loggedinUserDetails.uname
            ? loggedinUserDetails.uname.charAt(0)
            : ""}
        </Avatar>
      </Stack>

      <h2 style={{ marginTop: "30px" }}>
        {selectedUser
          ? selectedUser.name
          : name
          ? name
          : loggedinUserDetails.uname
          ? loggedinUserDetails.uname
          : ""}
      </h2>
      <div style={{ display: "flex" }}>
        <ChatIconWrapper onClick={handleChatIconClick}>
          <ChatIcon />
        </ChatIconWrapper>
        <div className="divider-rightcom">H</div>
        <VideoCallIconWrapper>
          <VideoCallIcon />
        </VideoCallIconWrapper>
      </div>
      <div style={{ display: "flex" }}>
        <Typography
          sx={{
            fontFamily: "Times New Roman",
            fontSize: "17px",
            paddingLeft: "97px",
            paddingTop: "8px",
          }}
        >
          Chat
        </Typography>
        <Typography
          sx={{
            fontFamily: "Times New Roman",
            fontSize: "17px",
            paddingLeft: "120px",
            paddingTop: "8px",
          }}
        >
          Video Call
        </Typography>
      </div>
    </div>
  );
};

export default Rightcom;
