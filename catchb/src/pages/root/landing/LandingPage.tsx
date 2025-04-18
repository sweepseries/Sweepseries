import { router, Redirect } from "expo-router";
import styled, { DefaultTheme } from "styled-components/native";

import { LoginButton, TextButton } from "@components/Buttons";
import { Divider } from "@components/Dividers";
import { useAuth } from "@contexts/auth";
import { useTheme } from "@contexts/theme";
import { CatchBLogo } from "@features/CatchB";

export function LandingPage() {
  const { mode } = useAuth();
  const { theme } = useTheme();

  const handleSignup = () => {
    router.push({
      pathname: "/signup/terms",
      params: { mode: "catchb" },
    });
  };

  const handleGuest = () => {
    router.replace("/home");
  };

  const handleLogin = () => {
    router.push("/login");
  };

  if (mode !== "guest") {
    return <Redirect href="/home" />;
  }

  return (
    <Container>
      <Header>
        <CatchBLogo />
        <HeaderText>
          {"지금 로그인하고\nCatch B에서 야구를 즐겨보세요!"}
        </HeaderText>
      </Header>
      <Buttons>
        <LoginButton type="naver" onPress={() => {}} />
        <LoginButton type="kakao" onPress={() => {}} />
        <LoginButton type="catchb" onPress={handleLogin} />
      </Buttons>
      <DividerWrapper>
        <Divider />
      </DividerWrapper>
      <Buttons>
        <GuideText>
          아직<EmphasisText> Catch B</EmphasisText> 회원이 아니신가요?
        </GuideText>
        <TextButton
          text="이메일로 가입하기"
          onPress={handleSignup}
          fontSize={16}
          backgroundColor={theme.background}
          color={theme.lowEmphasis}
        />
        <TextButton
          text="비회원으로 둘러보기"
          onPress={handleGuest}
          fontSize={16}
          backgroundColor={theme.background}
          color={theme.lowEmphasis}
        />
      </Buttons>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  gap: 16px;
  background-color: ${({ theme }: { theme: DefaultTheme }) =>
    theme.colors.background};
`;

const Header = styled.View`
  align-items: center;
  justify-content: center;
  gap: 24px;
`;

const HeaderText = styled.Text`
  text-align: center;
  font-size: 20px;
  line-height: 28px;
  include-font-padding: false;
`;

const Buttons = styled.View`
  justify-content: center;
  width: 100%;
  padding: 0 24px;
  gap: 8px;
`;

const DividerWrapper = styled.View`
  width: 100%;
  padding: 0 24px;
`;

const GuideText = styled.Text`
  margin: 0 0 8px 0;
  text-align: center;
  font-size: 16px;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.mediumEmphasis};
`;

const EmphasisText = styled.Text`
  font-weight: bold;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.primary};
`;
