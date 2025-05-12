import axios from "axios";

export async function naverLogin(profileId: string) {
  try {
    const response = await axios.post(
      "/v1/login/social/",
      {
        username: profileId,
        mode: "naver",
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
