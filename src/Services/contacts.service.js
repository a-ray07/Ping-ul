import axios from "axios";

export const fetchuserApi = async () => {
    try {
        const response = await axios.get(`https://ping-ul-backend.loca.lt/api/contacts`)
        console.log('Response for user contacts list fetched successfully:', response.data)
        const rep = { isSuccess: true, data: response.data }
        return rep
    }
    catch (error) {
        console.log(error)
        const errorResponse = {
            isSuccess: false,
            errorMessage: "Error occurred while fetching contact list"
        }
        return errorResponse
    }
}

export const deleteuserApi = async (userId) => {
    try {
        const response = await axios.put(`https://ping-ul-backend.loca.lt/api/contacts/${userId}`)
        console.log('Response for user deleted successfully:', response.data)
        const rep = { isSuccess: true, data: response.data }
        return rep
    }
    catch (error) {
        console.log(error)
        const errorResponse = {
            isSuccess: false,
            errorMessage: "Error occurred deleting user"
        }
        return errorResponse
    }
}
