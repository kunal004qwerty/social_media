import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

export const User_Messages = (id) => {
  return API.get(`/messages/${id}`);
};

export const Add_Message = (data) => {
  return API.post("/messages", data);
};
