import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { router } from "expo-router";
import styled, { DefaultTheme } from "styled-components/native";

import { TextButton } from "@components/Buttons";
import { VerticalDivider } from "@components/Dividers";
import { useAuth } from "@contexts/auth";
import { useTheme } from "@contexts/theme";
import { AuthTextInput } from "@features/Auth";
import { CatchBLogo } from "@features/CatchB";

export function LoginPage() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { catchBLogin } = useAuth();
  const { theme } = useTheme();

  const handleBack = () => {
    router.back();
  };

  const handleLoginPress = async () => {
    if (username.length === 0 || password.length === 0) {
      return;
    }

    const result = await catchBLogin(username, password);

    if (result) {
      router.dismissAll();
      router.replace("/home");
    }
  };

  return (
    <Container>
      <Header>
        <CatchBLogo />
        <HeaderText style={{ includeFontPadding: false }}>
          {"지금 로그인하고\nCatch B에서 야구를 즐겨보세요!"}
        </HeaderText>
      </Header>
      <Inputs>
        <AuthTextInput
          placeholder="아이디"
          value={username}
          onChangeText={setUsername}
          placeholderTextColor={theme.lowEmphasis}
          testID="아이디"
        />
        <AuthTextInput
          placeholder="비밀번호"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholderTextColor={theme.lowEmphasis}
          testID="비밀번호"
        />
        <TextButton text="로그인" onPress={handleLoginPress} />
        <Horizontal>
          <TouchableOpacity>
            <HelpText>아이디 찾기</HelpText>
          </TouchableOpacity>
          <VerticalDivider />
          <TouchableOpacity>
            <HelpText>비밀번호 찾기</HelpText>
          </TouchableOpacity>
        </Horizontal>
      </Inputs>
      <BackWrapper>
        <TextButton
          text="돌아가기"
          onPress={handleBack}
          backgroundColor={theme.background}
          color={theme.lowEmphasis}
        />
      </BackWrapper>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  gap: 8px;
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

const Inputs = styled.View`
  width: 100%;
  margin: 8px 0 0 0;
  padding: 0 24px;
  gap: 8px;
`;

const Horizontal = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 8px 0 16px 0;
  gap: 36px;
`;

const HelpText = styled.Text`
  text-align: center;
  font-size: 14px;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.lowEmphasis};
`;

const BackWrapper = styled.View`
  width: 100%;
  padding: 0 24px;
`;
