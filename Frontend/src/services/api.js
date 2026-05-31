import axios from "axios";

const API = axios.create({
  baseURL: "https://task-todo-app-backend.onrender.com",
});

export default API;