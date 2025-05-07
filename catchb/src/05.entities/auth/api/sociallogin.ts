import axios from "axios";

export async function socialLogin(profileId: string, mode: "naver" | "kakao") {
  try {
    const response = await axios.post(
      "/v1/login/social/",
      {
        username: profileId,
        mode,
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
