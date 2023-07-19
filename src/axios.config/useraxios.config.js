import axios from "axios";

export const fetchSignedInUserDataUrl = axios.create({
  baseURL: "https://ping-ul-backend.loca.lt/api/users",
});

export const updateSignedInUserDataUrl = axios.create({
  baseURL: "https://ping-ul-backend.loca.lt/api/users",
});

export const searchUserUrl = axios.create({
  baseURL: "https://ping-ul-backend.loca.lt/api/users/search",
});
