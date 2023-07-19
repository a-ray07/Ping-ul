import {
  setTokenUrl,
  signInUrl,
  signUpUrl,
  validateTokenUrl,
} from "../axios.config/authaxios.config";

export const signInApi = async (data) => {
  try {
    const result = await signInUrl.post("", data);
    const response = { isSuccess: true, data: result.data };
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const setToken = async (data) => {
  try {
    const result = await setTokenUrl.post("", data);
    console.log("token", result.data.token);
    return result.data.token;
  } catch (error) {
    console.error(error);
  }
};

export const signUpApi = async (data) => {
  try {
    const result = await signUpUrl.post("", data);
    console.log(result.data);
    return result.data;
  } catch (error) {
    console.error(error);
  }
};

export const validateToken = async (token) => {
  try {
    const response = await validateTokenUrl.get("", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const result = {
      isSuccess: true,
      data: response.data,
    };
    return result;
  } catch (error) {
    console.error("Token validation error", error);
    throw error;
  }
};
