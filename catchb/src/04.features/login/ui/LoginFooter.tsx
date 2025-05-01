import { TouchableOpacity } from "react-native";
import { router } from "expo-router";
import styled, { DefaultTheme } from "styled-components/native";

import { useColors } from "@shared/lib/colors";
import { TextButton } from "@shared/ui/Buttons";
import { VerticalDivider } from "@shared/ui/Dividers";

const Container = styled.View`
  width: 100%;
  margin: 4px 0;
  padding: 0 24px;
  gap: 32px;
`;

const Horizontal = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 36px;
`;

const HelpText = styled.Text`
  text-align: center;
  font-size: 14px;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.lowEmphasis};
`;

export function LoginFooter() {
  const { colors } = useColors();

  const handleBack = () => {
    router.back();
  };

  return (
    <Container>
      <Horizontal>
        <TouchableOpacity>
          <HelpText>아이디 찾기</HelpText>
        </TouchableOpacity>
        <VerticalDivider />
        <TouchableOpacity>
          <HelpText>비밀번호 찾기</HelpText>
        </TouchableOpacity>
      </Horizontal>
      <TextButton
        text="돌아가기"
        onPress={handleBack}
        backgroundColor={colors.background}
        color={colors.lowEmphasis}
      />
    </Container>
  );
}
