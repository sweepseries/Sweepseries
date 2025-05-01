import styled, { DefaultTheme } from "styled-components/native";

import { AuthHeader } from "@widgets/authheader";
import { LoginButtons, NavButtons } from "@features/login";
import { Divider } from "@shared/ui/Dividers";

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  gap: 16px;
  background-color: ${({ theme }: { theme: DefaultTheme }) =>
    theme.colors.background};
`;

const DividerWrapper = styled.View`
  width: 100%;
  padding: 0 24px;
`;

export function LandingPage() {
  return (
    <Container>
      <AuthHeader />
      <LoginButtons />
      <DividerWrapper>
        <Divider />
      </DividerWrapper>
      <NavButtons />
    </Container>
  );
}
