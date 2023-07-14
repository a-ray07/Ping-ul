import axios from "axios";

export const createconversationApi = async (users, token) => {
    try {
        const response = await axios.post(
            'https://ping-ul-backend.loca.lt/api/conversations',
            {
                type: 'personal',
                users: users
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        console.log('Response for conversation created:', response.data);
        const rep = { isSuccess: true, data: response.data };
        return rep;
    } catch (error) {
        console.log(error);
        const errorResponse = {
            isSuccess: false,
            errorMessage: 'Error occurred while creating the conversation'
        };
        return errorResponse;
    }
};

export const convfetchApi = async (page, limit, token) => {
    try {
        const response = await axios.get(`https://ping-ul-backend.loca.lt/api/conversations?page=${page}&limit=${limit}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        console.log("Response for conversation fetched:", response.data.conversations)
        const rep = { isSuccess: true, data: response.data }
        return rep
    }
    catch (error) {
        console.log(error)
        const errorResponse = {
            isSuccess: false,
            errorMessage: "Error occurred while fetching the conversation"
        }
        return errorResponse
    }
};
