import React, { useContext, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { validateToken } from '../Services/auth.services';
import AuthState from '../auth/Authcontext';
import { getmessageApi, personalmessageApi } from '../Services/messages.service';
import { convfetchApi } from '../Services/conversation.service';

const ChatContainer = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
}));

const ChatMessage = styled(Box)(({ theme }) => ({
    marginBottom: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    '&.user-a': {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',

    },
    '&.user-b': {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    }
}));

const ChatInputContainer = styled(Stack)(({ theme }) => ({
    position: 'fixed',
    bottom: theme.spacing(2),
    left: theme.spacing(2),
    right: theme.spacing(2),
    background: '#fff',
    padding: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[2],
    width: '640px',
}));

const Middlecom = () => {
    const { messages, setMessages, inputMessage, setInputMessage, selectedConversationId, setSelectedConversationId, setName, setPingId, setConversations } = useContext(AuthState)
    const [loggedInUserId, setLoggedInUserId] = useState(null);


    const handleInputChange = (event) => {
        setInputMessage(event.target.value)
    }

    const handleSendMessage = async () => {
        if (inputMessage.trim() === '') {
            return
        }

        const response = await personalmessageApi(localStorage.getItem('token'), selectedConversationId, inputMessage, loggedInUserId)
        if (response.isSuccess) {
            const newMessage = {
                text: inputMessage,
                sender_id: loggedInUserId,
                conversationId: selectedConversationId,
            }
            setMessages([...messages, newMessage])
            setInputMessage('')
        }
        else {
            console.log('Error occurred while sending message:', response.errorMessage);
        }
    }

    const MessageContent = styled(Box)(({ theme, isSent }) => ({
        backgroundColor: isSent ? '#4caf50' : '#2196f3',
        color: '#ffffff',
        padding: theme.spacing(1),
        borderRadius: theme.spacing(1),
        width: 'fit-content'
    }));

    useEffect(() => {
        console.log('Messagess:', messages)
        let userId = localStorage.getItem('User id:')
        console.log('User Id:', userId)
        setLoggedInUserId(userId)
        const senderId = messages.map((message) => message.sender_id)
        console.log("Sender Id:", senderId)
    }, [messages])

    const showMessages = messages.filter((message) => message.conversationId === selectedConversationId)

    return (
        <Box>
            <Typography variant="h4" component="h1" mb={2}>Chats</Typography>

            <ChatContainer elevation={0}>
                {messages
                    .map((message) => (
                        <ChatMessage className={message.sender_id === loggedInUserId ? 'user-b' : 'user-a'}>
                            <MessageContent isSent={message.sender_id === loggedInUserId} >
                                <Typography variant="body1">{message.text}</Typography>
                            </MessageContent>
                        </ChatMessage>
                    ))}
            </ChatContainer>

            <ChatInputContainer style={{ marginLeft: '400px' }} direction="row" spacing={2} alignItems="center">
                <TextField fullWidth placeholder="Type a message..." value={inputMessage} onChange={handleInputChange} />
                <SendIcon style={{ fontSize: '2.2rem' }} color="primary" onClick={handleSendMessage} />
            </ChatInputContainer>
        </Box>
    );
};

export default Middlecom;

//