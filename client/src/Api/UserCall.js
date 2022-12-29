import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

export const Get_User = ({ userId: userId, username: username }) => {
  if ({ username: username } !== undefined && !{ username: username }) {
    return API.get(`/users?username=${username}`, { username: username });
  } else {
    if ({ userId: userId }) {
      return API.get(`/users?userId=${userId}`, { userId: userId });
    }
  }
};

export const Update_User = (id, formData) => API.put(`/users/${id}`, formData);

export const Get_All_User = () => API.get("/users/all");

export const Get_User_Friends = (id) => {
  return API.get(`/users/friends/${id}`);
};

export const Follow_User = ({ id: id, userId: data }) => {
  return API.put(`/users/${id}/follow`, { userId: data });
};

export const Un_Follow_User = ({ id: id, userId: data }) => {
  return API.put(`/users/${id}/unfollow`, { userId: data });
};
