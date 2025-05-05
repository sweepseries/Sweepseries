import {
  me as getKakaoProfile,
  login as openKakaoLoginModule,
  isLogined as checkKakaoLoginState,
  KakaoUser,
} from "@react-native-kakao/user";
import { router } from "expo-router";
import styled from "styled-components/native";

import KakaoIcon from "./kakao.svg";
import { LoginButton, LoginButtonText, socialLogin } from "@entities/auth";
import { useAlert } from "@shared/lib/alert";
import { useAuth } from "@shared/lib/auth";

// 카카오 로그인
// 1. 카카오 로그인 여부 확인
// 2-1. 로그인 되어있지 않으면, 카카오 로그인 요청
// 2-2. 로그인 되어있으면, 카카오 프로필 정보 요청하고, 해당 정보로 캐치비 서버에 로그인
// 2-2-1. 로그인 성공하면, 캐치비 서버에서 받은 토큰을 저장하고, 홈 화면으로 이동
// 2-2-2. 로그인 실패하면, alert 띄우기
// 2-2-3. 로그인 결과가 "not_registered"이면, 회원가입 화면으로 이동

export function KakaoLogin() {
  const { showAlert } = useAlert();
  const { saveLoginStatus } = useAuth();

  const requestCatchBSocialLogin = async (profile: KakaoUser) => {
    const response = await socialLogin(String(profile.id), "kakao");

    if (response) {
      if (response.result === "NOT_REGISTERED") {
        router.push({
          pathname: "/signup/terms",
          params: {
            mode: "kakao",
            username: profile.id,
            email: profile.email,
            name: profile.name,
            phone: "",
            birthday: profile.birthday,
            birthyear: profile.birthyear,
            gender: profile.gender,
            nickname: profile.nickname,
            profileImage: profile.profileImageUrl,
          },
        });
      } else {
        saveLoginStatus(response);

        if (router.canDismiss()) {
          router.dismissAll();
        }
        router.replace("/home");
      }
    } else {
      showAlert({
        title: "서버 오류",
        message: "로그인 중 서버에 오류가 발생했습니다. 다시 시도해주세요.",
      });
    }
  };

  const onKakaoButtonPress = async () => {
    try {
      const isLoggedIn = await checkKakaoLoginState();

      if (!isLoggedIn) {
        await openKakaoLoginModule();
      }

      const profile = await getKakaoProfile();

      requestCatchBSocialLogin(profile);
    } catch {
      showAlert({
        title: "카카오 로그인 오류",
        message: "카카오 로그인 중 오류가 발생했습니다. 다시 시도해주세요.",
      });
    }
  };

  return (
    <KakaoContainer onPress={onKakaoButtonPress}>
      <KakaoIcon width={20} height={20} />
      <KakaoText>카카오로 로그인</KakaoText>
    </KakaoContainer>
  );
}

const KakaoContainer = styled(LoginButton)`
  gap: 8px;
  background-color: #fee500;
`;

const KakaoText = styled(LoginButtonText)`
  color: rgba(0, 0, 0, 0.85);
`;
