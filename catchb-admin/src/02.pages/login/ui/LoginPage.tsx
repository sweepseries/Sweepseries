import styled from "styled-components";

import { LoadingSpinner } from "@widgets/fallback/loading";
import {
  LoginForm,
  LoginFormProvider,
  useLoginForm,
} from "@features/auth/login";

export function LoginPage() {
  return (
    <LoginFormProvider>
      <Components />
    </LoginFormProvider>
  );
}

function Components() {
  const { isLoading } = useLoginForm();

  return (
    <Container>{isLoading ? <LoadingSpinner /> : <LoginForm />}</Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  height: 100dvh;
  background-color: ${({ theme }) => theme.colors.text700};
`;
