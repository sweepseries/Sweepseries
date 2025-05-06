import NaverLoginModule, {
  GetProfileResponse,
} from "@react-native-seoul/naver-login";
import { router } from "expo-router";
import styled from "styled-components/native";

import NaverIcon from "./naver.svg";
import { LoginButton, LoginButtonText, socialLogin } from "@entities/auth";
import { useAlert } from "@shared/lib/alert";
import { useAuth } from "@shared/lib/auth";

export function NaverLogin() {
  const { showAlert } = useAlert();
  const { saveLoginStatus } = useAuth();

  const requestCatchBSocialLogin = async (profile: GetProfileResponse) => {
    const response = await socialLogin(profile.response.id, "naver");

    if (response) {
      if (response.result === "NOT_REGISTERED") {
        router.push({
          pathname: "/signup/terms",
          params: {
            mode: "naver",
            username: profile.response.id,
            email: profile.response.email,
            name: profile.response.name,
            phone: "",
            birthday: profile.response.birthday ?? "",
            birthyear: profile.response.birthyear ?? "",
            gender: profile.response.gender ?? "",
            nickname: profile.response.nickname ?? "",
            profileImage: profile.response.profile_image ?? "",
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
        title: "오류 발생",
        message: "서버와 통신 중 오류가 발생했습니다. 다시 시도해주세요.",
      });
    }
  };

  const onNaverButtonPress = async () => {
    try {
      const result = await NaverLoginModule.login();

      if (!result.successResponse) {
        showAlert({
          title: "네이버 로그인 오류",
          message: "네이버 로그인 중 오류가 발생했습니다. 다시 시도해주세요.",
        });
        return;
      }

      const token = result.successResponse.accessToken;

      const profile = await NaverLoginModule.getProfile(token);

      requestCatchBSocialLogin(profile);
    } catch {
      showAlert({
        title: "네이버 로그인 오류",
        message: "네이버 로그인 중 오류가 발생했습니다. 다시 시도해주세요.",
      });
    }
  };

  return (
    <NaverContainer onPress={onNaverButtonPress}>
      <NaverIcon width={20} height={20} color="#fff" fill="#fff" />
      <NaverText>네이버로 로그인</NaverText>
    </NaverContainer>
  );
}

const NaverContainer = styled(LoginButton)`
  gap: 8px;
  background-color: #03c75a;
`;

const NaverText = styled(LoginButtonText)`
  color: white;
`;
