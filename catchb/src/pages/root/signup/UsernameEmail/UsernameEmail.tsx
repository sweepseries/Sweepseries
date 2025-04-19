import { useState } from "react";
import { router } from "expo-router";
import styled from "styled-components/native";

import { useSignup } from "@contexts/auth";
import { AuthInputTitle, AuthTextInput, SignUpForm } from "@features/Auth";
import { checkUsernameEmail } from "@services/auth";

export function UsernameEmail() {
  const [usernameInput, setUsernameInput] = useState<string>("");
  const [emailInput, setEmailInput] = useState<string>("");

  const [usernameError, setUsernameError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");

  const { setUsernameEmail } = useSignup();

  const isButtonActive = !!usernameInput && !!emailInput;

  const handleUsernameEmailCheck = async () => {
    setUsernameError("");
    setEmailError("");

    const response = await checkUsernameEmail(usernameInput, emailInput);

    if (response.status === 204) {
      setUsernameEmail(usernameInput, emailInput);
      router.push("/signup/password");
    } else if (response.data.error) {
      if (response.data.error.includes("아이디")) {
        setUsernameError(response.data.error);
      } else if (response.data.error.includes("이메일")) {
        setEmailError(response.data.error);
      } else {
        setEmailError("오류가 발생했습니다. 다시 시도해주세요.");
      }
    } else {
      setEmailError("오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <SignUpForm
      title="아이디와 이메일 주소를 입력해주세요!"
      buttonText="다음으로"
      buttonOnPress={handleUsernameEmailCheck}
      buttonDisabled={!isButtonActive}
    >
      <Wrapper>
        <AuthInputTitle>아이디</AuthInputTitle>
        <AuthTextInput
          value={usernameInput}
          onChangeText={setUsernameInput}
          placeholder="로그인 시 사용할 아이디를 입력해주세요."
          returnKeyType="next"
        />
        {usernameError ? <ErrorText>{usernameError}</ErrorText> : null}
      </Wrapper>
      <Wrapper>
        <AuthInputTitle>이메일</AuthInputTitle>
        <AuthTextInput
          value={emailInput}
          onChangeText={setEmailInput}
          placeholder="이메일을 입력해주세요."
          type="email-address"
        />
        {emailError ? <ErrorText>{emailError}</ErrorText> : null}
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
