import axios from "axios";

// const url = ;

const API = axios.create({ baseURL: "http://localhost:5000/api" });

export const Login_User = (formData) => API.post("/auth/login", formData);

export const Register_User = (formData) => API.post("/auth/register", formData);
