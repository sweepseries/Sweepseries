import axios from "axios";

import { getSecure } from "@services/storage";

export async function login(username: string, password: string) {
  try {
    const response = await axios.post(
      "/v1/login/",
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

export async function logout() {
  try {
    const refreshToken = await getSecure("refreshToken");

    await axios.post("/v1/logout/", {
      refresh: refreshToken,
    });

    return true;
  } catch {
    return false;
  }
}
