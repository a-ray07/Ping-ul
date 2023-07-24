import axios from "axios";

export const createConversationUrl = axios.create({
  baseURL: "https://ping-ul-arnab-backend.loca.lt/api/conversations",
});

export const convfetchUrl = axios.create({
  baseURL: "https://ping-ul-arnab-backend.loca.lt/api",
});
