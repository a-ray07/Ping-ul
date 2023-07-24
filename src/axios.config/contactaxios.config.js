import axios from "axios";

export const fetchUserUrl = axios.create({
  baseURL: "https://ping-ul-arnab-backend.loca.lt/api/contacts",
});

export const deleteUserUrl = axios.create({
  baseURL: "https://ping-ul-arnab-backend.loca.lt/api/contacts",
});
