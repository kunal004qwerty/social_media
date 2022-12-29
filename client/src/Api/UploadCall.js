import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

export const Upload_Img = (data) => API.post("/upload", data);

export const Upload_Post = (data) => API.post("/posts",data);
