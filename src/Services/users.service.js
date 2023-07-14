import axios from "axios";

export const fetchSignedInUserDataApi = async (userId, authToken) => {
    try {
        const response = await axios.get(`https://ping-ul-backend.loca.lt/api/users/${userId}`,
            {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            }
        )
        console.log("Signed-in user data:", response.data)
        const rep = { isSuccess: true, data: response.data }
        return rep
    }
    catch (error) {
        console.error("Error fetching signed-in user data:", error.message)
        const errorResponse = {
            isSuccess: false,
            errorMessage: "Error occurred while fetching signed-in user data"
        };
        return errorResponse
    }
}

export const updateSignedInUserDataApi = async (userId, newData) => {
    try {
        const response = await axios.put(`https://ping-ul-backend.loca.lt/api/users/${userId}`, newData)
        console.log("Response for signed-in user data updated successfully:", response.data)
        const rep = { isSuccess: true, data: response.data }
        return rep
    }
    catch (error) {
        console.error("Error updating signed-in user data:", error.message)
        const errorResponse = {
            isSuccess: false,
            errorMessage: "Error occurred while updating signed-in user data"
        };
        return errorResponse
    }
}

export const searchUser = async (pingId) => {
    try {
        const response = await axios.get(`https://ping-ul-backend.loca.lt/api/users/search/${pingId}`)
        console.log("Response for user search results:", response.data)
        const rep = { isSuccess: true, data: response.data }
        return rep
    }
    catch (error) {
        console.error("Error searching user:", error.message)
        const errorResponse = {
            isSuccess: false,
            errorMessage: "Error occurred while searching for the user"
        }
        return errorResponse
    }
};


