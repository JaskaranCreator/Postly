import axios from "axios";

// Centralized API configuration.
// This avoids repeating the base URL in different files.
const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export default api;