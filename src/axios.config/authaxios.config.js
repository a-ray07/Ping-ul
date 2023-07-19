import axios from "axios";

export const signInUrl = axios.create({
  baseURL: "https://ping-ul-backend.loca.lt/api/auth/signIn",
});

export const setTokenUrl = axios.create({
  baseURL: "https://ping-ul-backend.loca.lt/api/auth/signIn",
});

export const signUpUrl = axios.create({
  baseURL: "https://ping-ul-backend.loca.lt/api/auth/signUp",
});

export const validateTokenUrl = axios.create({
  baseURL: "https://ping-ul-backend.loca.lt/api/auth/validatetoken",
});
