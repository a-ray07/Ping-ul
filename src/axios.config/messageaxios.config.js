import axios from "axios";

export const personalmessageUrl = axios.create({
  baseURL: "https://ping-ul-backend.loca.lt/api/messages",
});

export const getmessageUrl = axios.create({
  baseURL: "https://ping-ul-backend.loca.lt/api",
});
