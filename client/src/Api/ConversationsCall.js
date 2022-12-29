import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

export const User_Conversations = (id) => {
  return API.get(`/conversations/${id}`);
};

export const create_Conversations = (senderId, receiverId) => {
  console.log(senderId, receiverId);
  return API.post(`/conversations`, senderId, receiverId);
};
