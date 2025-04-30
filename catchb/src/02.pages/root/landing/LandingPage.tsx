import { router } from "expo-router";
import styled, { DefaultTheme } from "styled-components/native";

import { Divider } from "@shared/ui/Dividers";
import { AuthHeader } from "@widgets/authheader";

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  gap: 16px;
  background-color: ${({ theme }: { theme: DefaultTheme }) =>
    theme.colors.background};
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

export function LandingPage() {
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

  /*if (mode !== "guest") {
    return <Redirect href="/home" />;
  }*/

  return (
    <Container>
      <AuthHeader />
      <Buttons></Buttons>
      <DividerWrapper>
        <Divider />
      </DividerWrapper>
    </Container>
  );
}
