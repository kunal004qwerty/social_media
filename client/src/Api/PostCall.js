import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

// !-------------- ttimeline_post user and of his friends
export const Get_All_Timeline_Post = (id) => API.get(`/posts/timeline/${id}`);

// !----------------LIKE POST
export const Like_Post = (id, userId) => {
  API.put(`/posts/${id}/like`, { userId: userId });
};
