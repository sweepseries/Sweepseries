import { router } from "expo-router";
import styled, { DefaultTheme } from "styled-components/native";

import { useColors } from "@shared/lib/colors";
import { TextButton } from "@shared/ui/Buttons";

const Container = styled.View`
  width: 100%;
  padding: 0 24px;
  gap: 8px;
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

export function LandingPageActions() {
  const { colors } = useColors();

  const handleSignup = () => {
    router.push({
      pathname: "/signup/terms",
      params: { mode: "catchb" },
    });
  };

  const handleGuest = () => {
    router.replace("/home");
  };

  return (
    <Container>
      <GuideText>
        아직<EmphasisText> Catch B</EmphasisText> 회원이 아니신가요?
      </GuideText>
      <TextButton
        text="이메일로 가입하기"
        onPress={handleSignup}
        fontSize={16}
        backgroundColor={colors.background}
        color={colors.lowEmphasis}
      />
      <TextButton
        text="비회원으로 둘러보기"
        onPress={handleGuest}
        fontSize={16}
        backgroundColor={colors.background}
        color={colors.lowEmphasis}
      />
    </Container>
  );
}
