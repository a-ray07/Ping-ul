import React, { useContext, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MoreIcon from "@mui/icons-material/MoreVert";
import Button from "@mui/material/Button";
import AuthState from "../auth/Authcontext";
import LoggedInUserDetails from "./LoggedInUserDetails";
import { colors } from "@mui/material";

const Navbar = () => {
  const { handleLogout, checkLoggedInStatus } = useContext(AuthState);

  useEffect(() => {
    checkLoggedInStatus();
  }, [checkLoggedInStatus]);

  return (
    <div className="navbar">
      <Box sx={{ flexGrow: 1, paddingBottom: "5px" }}>
        <AppBar
          position="static"
          sx={{ backgroundColor: "rgb(239, 241, 243)", padding: "0px" }}
        >
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                display: {
                  xs: "none",
                  sm: "block",
                  color: "black",
                  fontWeight: "bold",
                  fontSize: "25px",
                },
              }}
            >
              PING UL
            </Typography>

            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <LoggedInUserDetails />
              <Button
                size="large"
                variant="text"
                aria-label="logout"
                color="inherit"
                onClick={handleLogout}
                style={{
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)",
                  color: "rgba(0, 0, 0, 0.5)",
                  fontSize: "16px",
                }}
              >
                Logout
              </Button>
            </Box>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-haspopup="true"
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
};

export default Navbar;
