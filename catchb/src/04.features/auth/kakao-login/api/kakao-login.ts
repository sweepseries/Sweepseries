import axios from "axios";

export async function kakaoLogin(profileId: number) {
  try {
    const response = await axios.post(
      "/api/v1/login/social/",
      {
        username: profileId,
        mode: "kakao",
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
