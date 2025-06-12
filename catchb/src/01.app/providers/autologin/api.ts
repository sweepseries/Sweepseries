import axios from "axios";

export async function refreshToken(refreshToken: string | null) {
  if (!refreshToken) {
    return null;
  }

  try {
    const response = await axios.post(
      "/api/v1/tokens/refresh/",
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
