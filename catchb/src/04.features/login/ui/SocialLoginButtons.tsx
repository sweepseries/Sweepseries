import { router } from "expo-router";
import styled, { DefaultTheme } from "styled-components/native";

import KakaoIcon from "./kakao.svg";
import NaverIcon from "./naver.svg";
import { kakaoLogin, naverLogin } from "@entities/auth";
import { LoginButtonContainer, LoginButtonText } from "@shared/ui/Buttons";

const CatchBContainer = styled(LoginButtonContainer)`
  background-color: ${({ theme }: { theme: DefaultTheme }) =>
    theme.colors.primary};
`;

const KakaoContainer = styled(LoginButtonContainer)`
  gap: 8px;
  background-color: #fee500;
`;

const KakaoText = styled(LoginButtonText)`
  color: rgba(0, 0, 0, 0.85);
`;

const NaverContainer = styled(LoginButtonContainer)`
  gap: 8px;
  background-color: #03c75a;
`;

const NaverText = styled(LoginButtonText)`
  color: white;
`;

const Buttons = styled.View`
  justify-content: center;
  width: 100%;
  padding: 0 24px;
  gap: 8px;
`;

export function SocialLoginButtons() {
  const handleLogin = () => {
    router.push("/login");
  };

  return (
    <Buttons>
      <NaverContainer onPress={naverLogin}>
        <NaverIcon width={20} height={20} color="#fff" />
        <NaverText>네이버로 로그인</NaverText>
      </NaverContainer>
      <KakaoContainer onPress={kakaoLogin}>
        <KakaoIcon width={20} height={20} />
        <KakaoText>카카오로 로그인</KakaoText>
      </KakaoContainer>
      <CatchBContainer onPress={handleLogin}>
        <LoginButtonText>이메일로 로그인</LoginButtonText>
      </CatchBContainer>
    </Buttons>
  );
}
