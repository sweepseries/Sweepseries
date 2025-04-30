import styled, { DefaultTheme } from "styled-components/native";

import { LoginButtonContainer, LoginButtonText } from "@shared/ui/Buttons";

const CatchBContainer = styled(LoginButtonContainer)`
  background-color: ${({ theme }: { theme: DefaultTheme }) =>
    theme.colors.primary};
`;

export function CatchBLoginButton({ onPress }: { onPress: () => void }) {
  return (
    <CatchBContainer onPress={onPress}>
      <LoginButtonText>이메일로 로그인</LoginButtonText>
    </CatchBContainer>
  );
}
