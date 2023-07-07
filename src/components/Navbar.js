import React, { useContext, useEffect } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import Button from '@mui/material/Button';
import AuthState from '../auth/Authcontext';

const Navbar = () => {
    const { handleLogout, checkLoggedInStatus } = useContext(AuthState)

    useEffect(() => {
        checkLoggedInStatus()
    }, [checkLoggedInStatus])


    return (
        <div className='navbar'>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>

                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ display: { xs: 'none', sm: 'block' } }}
                        >
                            ATOMS
                        </Typography>

                        <Box sx={{ flexGrow: 1 }} />
                        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>

                            <IconButton
                                size="large"
                                aria-label="show 17 new notifications"
                                color="inherit"
                            >
                                <Badge badgeContent={17} color="error">
                                    <NotificationsIcon />
                                </Badge>
                            </IconButton>
                            <Button
                                size="large"
                                variant="text"
                                aria-label="logout"
                                color="inherit"
                                onClick={handleLogout}
                            >
                                Logout
                            </Button>
                        </Box>
                        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
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