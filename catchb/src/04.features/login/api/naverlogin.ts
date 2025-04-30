import NaverLogin from "@react-native-seoul/naver-login";
import axios from "axios";

export async function naverLogin() {
  try {
    const result = await NaverLogin.login();

    if (!result.successResponse) {
      return null;
    }

    const token = result.successResponse.accessToken;

    const profile = await NaverLogin.getProfile(token);
    const response = await axios.post(
      "/v1/login/social/",
      {
        username: profile.response.id,
        mode: "naver",
      },
      {
        headers: {
          "X-Sweep-Platform": "sweep/mobile",
        },
      }
    );

    if (response.data.result === "NOT_REGISTERED") {
      return {
        result: "REDIRECT",
        initialProfile: profile.response,
      };
    }

    return response.data;
  } catch {
    return null;
  }
}
