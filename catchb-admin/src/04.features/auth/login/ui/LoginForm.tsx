import { useEffect, useState } from "react";
import styled from "styled-components";

import { useLoginForm } from "../hooks/useLoginForm";
import { Logo } from "@shared/ui/Icons";

export function LoginForm() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { onLogin } = useLoginForm();

  useEffect(() => {
    const handleEnterKey = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        onLogin(username, password);
      }
    };

    window.addEventListener("keydown", handleEnterKey);
    return () => {
      window.removeEventListener("keydown", handleEnterKey);
    };
  }, [username, password, onLogin]);

  return (
    <Container>
      <Logo size={280} />
      <InputWrapper>
        <TextInput
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="아이디"
          data-testid="username-input"
        />
        <TextInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호"
          type="password"
          data-testid="password-input"
        />
      </InputWrapper>
      <Button onClick={() => onLogin(username, password)}>로그인</Button>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 32px;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
`;

const TextInput = styled.input`
  border: ${({ theme }) => `1.5px solid ${theme.colors.borderDark}`};
  outline: none;
  border-radius: 4px;
  padding: 12px 8px 8px 16px;
  width: 25vw;

  font-size: 18px;
`;

const Button = styled.button`
  width: 25vw;
  height: 40px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.foreground900};
  color: ${({ theme }) => theme.colors.background100};
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
`;
