import axios from "axios";
import {
  me as getKakaoProfile,
  login as kakaoLoginModule,
  isLogined as isKakaoLoggedIn,
} from "@react-native-kakao/user";
import NaverLogin from "@react-native-seoul/naver-login";

async function socialLoginCatchB(id: number | string, mode: "kakao" | "naver") {
  try {
    const response = await axios.post(
      "/v1/login/social/",
      {
        username: id,
        mode,
      },
      {
        headers: {
          "X-Sweep-Platform": "sweep/mobile",
        },
      }
    );

    if (response.data.result === "NOT_REGISTERED") {
      return "REDIRECT";
    }

    return response.data;
  } catch {
    return null;
  }
}

export async function kakaoLogin() {
  // 카카오 로그인
  // 1. 카카오 로그인 여부 확인
  // 2-1. 로그인 되어있지 않으면, 카카오 로그인 요청
  // 2-2. 로그인 되어있으면, 카카오 프로필 정보 요청하고, 해당 정보로 캐치비 서버에 로그인
  // 2-2-1. 로그인 성공하면, 캐치비 서버에서 받은 토큰을 저장하고, 홈 화면으로 이동
  // 2-2-2. 로그인 실패하면, alert 띄우기
  // 2-2-3. 로그인 결과가 "not_registered"이면, 회원가입 화면으로 이동

  try {
    const isLoggedIn = await isKakaoLoggedIn();

    if (!isLoggedIn) {
      await kakaoLoginModule();
    }

    const profile = await getKakaoProfile();

    const response = await socialLoginCatchB(profile.id, "kakao");

    if (response === "REDIRECT") {
      return {
        result: "REDIRECT",
        initialProfile: profile,
      };
    }

    return response;
  } catch {
    return null;
  }
}

export async function naverLogin() {
  try {
    const result = await NaverLogin.login();

    if (!result.successResponse) {
      return null;
    }

    const token = result.successResponse.accessToken;

    const profile = await NaverLogin.getProfile(token);
    const response = await socialLoginCatchB(profile.response.id, "naver");

    if (response === "REDIRECT") {
      return {
        result: "REDIRECT",
        initialProfile: profile.response,
      };
    }

    return response;
  } catch {
    return null;
  }
}
