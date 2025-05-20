import { router } from "expo-router";
import styled, { DefaultTheme } from "styled-components/native";

import { useColors } from "@shared/lib/colors";
import { TextButton } from "@shared/ui/Buttons";
import { AppIcon } from "@shared/ui/Icons";

export function LoginNeeded() {
  const { colors } = useColors();

  const goToLandingPage = () => {
    if (router.canDismiss()) router.dismissAll();
    router.replace("/");
  };

  return (
    <Container>
      <AppIcon icon="warning-circle" size={64} color={colors.primary} />
      <GuideText>로그인하고 더 많은 서비스를 이용해보세요.</GuideText>
      <ButtonWrapper>
        <TextButton
          text="로그인 하러가기"
          color={colors.primary}
          backgroundColor={colors.background}
          borderColor={colors.lowEmphasis}
          fontSize={18}
          onPress={goToLandingPage}
        />
      </ButtonWrapper>
    </Container>
  );
}

const Container = styled.View`
  align-items: center;
  justify-content: center;
  padding: 36px 0;
  gap: 16px;
  background-color: ${({ theme }: { theme: DefaultTheme }) =>
    theme.colors.background};
`;

const GuideText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.lowEmphasis};
`;

const ButtonWrapper = styled.View`
  width: 100%;
  margin-top: 36px;
  padding: 0 16px;
`;
