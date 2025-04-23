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

export async function refresh() {
  try {
    const refreshToken = await getSecure("refreshToken");
    const response = await axios.post(
      "/v1/tokens/refresh/",
      {
        refresh: refreshToken,
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
