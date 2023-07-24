import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { validateToken } from "../Services/auth.services";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const LoggedInUserDetails = () => {
  const [open, setOpen] = useState(false);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      validateToken(token)
        .then((result) => {
          if (result.isSuccess) {
            setUserDetails(result.data);
          } else {
            console.log("Token not valid");
          }
        })
        .catch((error) => {
          console.error("Token validation error", error);
        });
    }
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (!userDetails) {
    return null;
  }

  const { name, email, gender, contactNumber } = userDetails;

  return (
    <div className="show-details">
      <Stack direction="row" spacing={2} onClick={handleClickOpen}>
        <Avatar
          alt={name ? name.charAt(0) : ""}
          sx={{
            backgroundColor: "green",
            width: 40,
            height: 40,
            fontSize: "23px",
            fontFamily: "Times New Roman",
          }}
        >
          {name ? name.charAt(0) : ""}
        </Avatar>
      </Stack>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle disableTypography sx={{ m: 0, p: 2 }}>
          <Typography
            variant="h6"
            sx={{
              color: "blue",
              fontFamily: "Times New Roman",
              fontSize: "30px",
              fontWeight: "bold",
            }}
          >
            User Details
          </Typography>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Stack direction="row" spacing={2}>
            <Avatar
              alt={name ? name.charAt(0) : ""}
              sx={{
                width: 70,
                height: 70,
                fontSize: "35px",
                fontFamily: "Times New Roman",
                backgroundColor: "green",
              }}
            >
              {name ? name.charAt(0) : ""}
            </Avatar>
          </Stack>
          <br />
          <Typography
            variant="body1"
            sx={{ fontFamily: "Franklin Gothic Medium", fontSize: "20px" }}
          >
            Name: {name}
          </Typography>
          <Typography
            variant="body1"
            sx={{ fontFamily: "Franklin Gothic Medium", fontSize: "20px" }}
          >
            Email: {email}
          </Typography>
          <Typography
            variant="body1"
            sx={{ fontFamily: "Franklin Gothic Medium", fontSize: "20px" }}
          >
            Gender: {gender}
          </Typography>
          <Typography
            variant="body1"
            sx={{ fontFamily: "Franklin Gothic Medium", fontSize: "20px" }}
          >
            Contact Number: {contactNumber}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
};

export default LoggedInUserDetails;
