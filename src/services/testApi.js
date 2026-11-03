import api from "./api";

async function getPosts() {
  try {
    const response = await api.get("/posts");

    console.log(response.data);
  } catch (error) {
    console.log("Error:", error.message);
  }
}

getPosts();
