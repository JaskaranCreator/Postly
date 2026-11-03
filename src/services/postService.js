import api from "./api";

// Function to get all posts
export const getPosts = async () => {
  const response = await api.get("/posts");

  return response.data;
};

// Function to get all users
export const getUsers = async () => {
  const response = await api.get("/users");

  return response.data;
};