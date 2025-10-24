import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000", 
  timeout: 3000, 
  headers: { Authorization: "api-key" },
});

export default api;