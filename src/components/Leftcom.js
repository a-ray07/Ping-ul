import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import shadows from '@mui/material/styles/shadows';
import { BorderAllOutlined } from '@mui/icons-material';


const Leftcom = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState('Remy Sharp');
    const [title, setTitle] = useState('Software Developer');

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        setIsEditing(false);
    };

    const handleChangeName = (event) => {
        setName(event.target.value);
    };

    const handleChangeTitle = (event) => {
        setTitle(event.target.value);
    };

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    const Search = styled("div")(({ theme }) => ({
        position: "relative",
        borderRadius: theme.shape.borderRadius,
        marginLeft: 0,
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            marginLeft: theme.spacing(1),
            width: "auto",
        },
    }));

    const SearchIconWrapper = styled("div")(({ theme }) => ({
        padding: theme.spacing(0, 2),
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
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create("width"),
            width: "100%",
            [theme.breakpoints.up("sm")]: {
                width: "12ch",
                "&:focus": {
                    width: "20ch",
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
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={1}>
                    <Grid item xs={3}>
                        <Stack direction="row" spacing={2}>
                            <Avatar
                                alt="Remy Sharp"
                                src="/static/images/avatar/1.jpg"
                                sx={{ width: 70, height: 70 }}
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={9} container spacing={2}>
                        <Grid item xs={11}>
                            <Stack direction="row" spacing={2} >
                                <div>
                                    <TextField
                                        id="editable-field-name"
                                        label=""
                                        value={name}
                                        onChange={handleChangeName}
                                        InputProps={{
                                            readOnly: !isEditing,
                                            sx: { pr: 1 },
                                            style: {
                                                height: '43px',
                                                display: 'flex',
                                                alignItems: 'flex-start',
                                                fontSize: '21px',
                                            },
                                        }}
                                        className="editable-field"
                                    />
                                    <TextField
                                        id="editable-field-title"
                                        label=""
                                        value={title}
                                        onChange={handleChangeTitle}
                                        InputProps={{
                                            readOnly: !isEditing,
                                            sx: { pr: 1, height: '20px', fontSize: '12px' },
                                        }}
                                        className="editable-field"
                                    />
                                </div>
                                <IconButton aria-label={isEditing ? 'save' : 'edit'} onClick={isEditing ? handleSaveClick : handleEditClick}>
                                    {isEditing ? <CheckCircleIcon /> : <EditIcon />}
                                </IconButton>
                            </Stack>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" elevation={0} style={{ backgroundColor: "#c4d1df", color: "black" }}>
                    <Toolbar>
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search…"
                                inputProps={{ "aria-label": "search" }}
                            />
                        </Search>
                    </Toolbar>
                </AppBar>
            </Box><br />
            <Stack direction="column" spacing={2}>
                <Avatar alt="Remy Sharp" src="/path/to/avatar1.jpg" />
                <Avatar alt="Travis Howard" src="/path/to/avatar2.jpg" />
                <Avatar alt="Cindy Baker" src="/path/to/avatar3.jpg" />
            </Stack>
        </div>
    );
};

export default Leftcom;