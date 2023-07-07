import axios from "axios";

export const signInApi = async (data) => {
    try {
        const result = await axios.post(`https://ping-ul-backend.loca.lt/api/auth/signIn`, data)
        const response = { isSuccess: true, data: result.data }
        return response
    }
    catch (error) {
        console.error(error)
    }
}

export const setToken = async (data) => {
    try {
        const result = await axios.post(`https://ping-ul-backend.loca.lt/api/auth/signIn`, data)
        console.log('token', result.data.token)
        return result.data.token
    }
    catch (error) {
        console.error(error)
    }
}

export const signUpApi = async (data) => {
    try {
        const result = await axios.post(`https://ping-ul-backend.loca.lt/api/auth/signUp`, data)
        console.log(result.data)
        return result.data
    }
    catch (error) {
        console.error(error)
    }
}

export const validateToken = async (token) => {
    try {
        const response = await axios.get(`https://ping-ul-backend.loca.lt/api/auth/validatetoken`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        if (response.status === 200) {
            return true
        }
        else {
            return false
        }
    }
    catch (error) {
        console.error('Token validation error', error)

    }

}