import styled, { DefaultTheme } from "styled-components/native";

import { AuthHeader } from "@widgets/authheader";
import { LoginFooter, LoginForm } from "@features/login";

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background-color: ${({ theme }: { theme: DefaultTheme }) =>
    theme.colors.background};
`;

export function LoginPage() {
  return (
    <Container>
      <AuthHeader />
      <LoginForm />
      <LoginFooter />
    </Container>
  );
}
