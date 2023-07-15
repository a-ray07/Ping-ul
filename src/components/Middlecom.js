import React, { useContext, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { validateToken } from '../Services/auth.services';
import { getmessageApi, personalmessageApi } from '../Services/messages.service';
import { convfetchApi } from '../Services/conversation.service';
import CentralState from '../context/CentralContext';
import { object } from 'yup';

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
    const { messages, setMessages, inputMessage, setInputMessage, selectedConversationId, selectedUser, loggedInUserId } = useContext(CentralState)
    const [showMessages, setShowMessages] = useState([])


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
            // setMessages((prev) => ({
            //     ...prev,
            //     [selectedConversationId]: [...prev[selectedConversationId], newMessage],
            // }));
            setInputMessage('')
        }
        else {
            console.log('Error occurred while sending message:', response.errorMessage);
        }
    }

    const token = localStorage.getItem('token');

    useEffect(() => {
        if (Object.keys(messages).includes(selectedConversationId)) {
            setShowMessages(messages[selectedConversationId])
            console.log('Mes:', showMessages)
            return
        }

        else {
            const fetchMessages = (async () => {
                const res = await getmessageApi(1, 100, selectedConversationId, token)
                if (res.isSuccess) {
                    setMessages((prev) => {
                        prev[selectedConversationId] = res.data
                        return prev
                    })
                    setShowMessages(res.data)
                }
                else {
                    console.error(res.errorMessage);
                }
            })
            fetchMessages()
        }
    }, [selectedConversationId, token, messages, setMessages]);

    const MessageContent = styled(Box)(({ theme, isSent }) => ({
        backgroundColor: isSent ? '#4caf50' : '#2196f3',
        color: '#ffffff',
        padding: theme.spacing(1),
        borderRadius: theme.spacing(1),
        width: 'fit-content'
    }));


    return (
        <Box>
            <Typography variant="h4" component="h1" mb={2}>{ }</Typography>

            <ChatContainer elevation={0}>
                {Array.isArray(showMessages) && showMessages
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
