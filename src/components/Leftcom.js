import React, { useContext, useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { validateToken } from '../Services/auth.services';
import Typography from '@mui/material/Typography';
import { fetchuserApi } from '../Services/contacts.service';
import { convfetchApi } from '../Services/conversation.service';
import { getmessageApi } from '../Services/messages.service';
import AuthState from '../auth/Authcontext';


const Leftcom = () => {

    const { addNewContactName, setAddNewContactName, selectedUser, setSelectedUSer, name, setName, conversations, setConversations, pingId, setPingId, messages, setMessages, selectedConversationId, setSelectedConversationId } = useContext(AuthState)



    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            validateToken(token)
                .then((result) => {
                    if (result.isSuccess) {
                        const { name, pingId } = result.data
                        setName(name)
                        setPingId(pingId)
                        fetchConversation(token)
                    } else {
                        console.log('Token not valid');
                    }
                })
                .catch((error) => {
                    console.error('Token validation error', error);
                });
        } else {
            console.log('Token not found');
        }
    }, []);

    const fetchConversation = async (token) => {
        const response = await convfetchApi(1, 100, token)
        if (response.isSuccess) {
            const conversations = response.data.conversations;
            const conversationIds = conversations.map((conversation) => conversation._id)
            console.log("Conversation IDs:", conversationIds)
            setConversations(conversations)
        }
        else {
            console.error(response.errorMessage)
        }
    }

    useEffect(() => {
        const addConversationUser = (addNewContactName) => {
            if (!conversations.find((conversation) => conversation._id === addNewContactName)) {
                const newConversation = {
                    _id: addNewContactName,
                };
                // const selectedConversation = conversations.find((conversation) => conversation._id === newConversation);
                // const newUser = selectedConversation.users.find((user) => user.name !== name);
                // if (newUser) {
                //     setName(newUser.name);
                // }

                setConversations((prevConversations) => [...prevConversations, newConversation]);

                console.log('New Conversation Ids:', conversations)

            }
        };
        addConversationUser(addNewContactName)

    }, [])




    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    const handleUserClick = async (conversationId) => {
        const selectedConversation = conversations.find((conversation) => conversation._id === conversationId);
        const idd = selectedConversation._id
        setSelectedConversationId(conversationId)
        console.log('cid:', idd)

        const selecteUser = selectedConversation.users.find((user) => user.name !== name)
        setSelectedUSer(selecteUser)

        const token = localStorage.getItem('token')
        if (token) {
            const response = await getmessageApi(1, 100, idd, token);
            if (response.isSuccess) {
                setMessages(response.data.messages);
            } else {
                console.error(response.errorMessage);
            }
        } else {
            console.log('Token not found.');
        }
    }



    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={1}>
                    <Grid item xs={3}>
                        <Stack direction="row" spacing={2}>
                            <Avatar alt={name ? name.charAt(0) : ''} sx={{ width: 70, height: 70, fontSize: '35px', fontFamily: 'Times New Roman' }}>
                                {name ? name.charAt(0) : ''}
                            </Avatar>
                        </Stack>
                    </Grid>
                    <Grid item xs={9} container spacing={2}>
                        <Grid item xs={11}>
                            <Stack direction="row" spacing={2}>
                                <div><br />
                                    <div className='user-name'>{name}</div>
                                </div>
                            </Stack>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
            {/* <Typography variant="h6" sx={{ textAlign: 'left', fontFamily: 'Times New Roman', fontSize: '15px', padding: '5px' }}>
                //Ping-ID: {pingId}
            </Typography> */}
            <br /><br />
            <Stack direction="column" spacing={1}>
                {conversations.map((conversation) => {
                    const showUser = conversation.users?.find(
                        (user) => user.name !== name
                    );
                    if (!showUser) return null
                    return (
                        <Grid container spacing={1} key={conversation._id} onClick={() => handleUserClick(conversation._id)} sx={{ boxShadow: '0px 2px 4px rgba(0, 0, 255, 0.5)', backgroundColor: 'rgba(0, 0, 255, 0.1)' }} >
                            <Grid item xs={1.5}>
                                <Stack direction="row" spacing={2} alignItems="center" >
                                    {showUser && showUser.name && (
                                        <Avatar style={{ marginLeft: '3px' }} alt={showUser.name ? showUser.name.charAt(0) : ''}>
                                            {showUser.name.charAt(0)}
                                        </Avatar>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={10}>
                                <Stack direction="row" spacing={0} alignItems="center">
                                    {showUser && showUser.name && (
                                        <div className='name-contacts'>{showUser.name}</div>
                                    )}
                                </Stack>
                            </Grid>
                        </Grid>
                    )
                })}
            </Stack>


        </div >
    );
};

export default Leftcom;
