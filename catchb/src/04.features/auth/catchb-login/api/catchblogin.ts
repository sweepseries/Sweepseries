import axios from "axios";

export async function login(username: string, password: string) {
  try {
    const response = await axios.post(
      "/api/v1/login/",
      {
        username,
        password,
      },
      {
        headers: {
          "X-Sweep-Platform": "sweep/mobile",
        },
      }
    );

    return response.data;
  } catch {
    return null;
  }
}
