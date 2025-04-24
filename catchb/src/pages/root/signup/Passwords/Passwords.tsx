import { useState } from "react";
import { router } from "expo-router";
import styled from "styled-components/native";

import { useSignup } from "@contexts/auth";
import { AuthInputTitle, AuthTextInput, SignUpForm } from "@features/Auth";
import { checkPassword } from "@services/auth";

export function Passwords() {
  const [password, setPassword] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");
  const [error, setError] = useState<string>("");

  const isButtonActive = !!password && !!password2;

  const { setPasswords } = useSignup();

  const handlePasswordCheck = async () => {
    setError("");

    const response = await checkPassword(password, password2);

    if (response.status === 204) {
      setPasswords(password, password2);
      router.push("/signup/phone");
    } else if (response.data.error) {
      setError(response.data.error);
    } else {
      setError("오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <SignUpForm
      title="비밀번호를 설정해주세요!"
      subtitle={"영문+숫자+특수문자 조합으로\n8자리 이상 입력해주세요."}
      buttonText="다음으로"
      buttonOnPress={handlePasswordCheck}
      buttonDisabled={!isButtonActive}
    >
      <Wrapper>
        <AuthInputTitle>비밀번호</AuthInputTitle>
        <AuthTextInput
          value={password}
          onChangeText={setPassword}
          placeholder="영문+숫자+특수문자 조합으로 8자리 이상"
          secureTextEntry
          returnKeyType="next"
        />
      </Wrapper>
      <Wrapper>
        <AuthInputTitle>비밀번호 확인</AuthInputTitle>
        <AuthTextInput
          value={password2}
          onChangeText={setPassword2}
          placeholder="비밀번호를 다시 입력해주세요."
          secureTextEntry
          returnKeyType="done"
        />
        {error ? <ErrorText>{error}</ErrorText> : null}
      </Wrapper>
    </SignUpForm>
  );
}

const Wrapper = styled.View`
  margin: 8px 0;
  gap: 8px;
`;

const ErrorText = styled.Text`
  color: rgba(255, 0, 0, 0.8);
  font-size: 14px;
  text-align: left;
`;
