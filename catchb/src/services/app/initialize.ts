import axios from "axios";

export async function initialize() {
  try {
    const response = await axios.get("/v1/initialize/", {
      timeout: 3000,
    });

    return response.data;
  } catch {
    return null;
  }
}
