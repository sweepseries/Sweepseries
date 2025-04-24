import { useEffect, useState } from "react";
import { router } from "expo-router";
import styled from "styled-components/native";

import { TextButton } from "@components/Buttons";
import { useAlert } from "@contexts/app";
import { useSignup } from "@contexts/auth";
import {
  AuthInputTitle,
  AuthTextInput,
  PhoneNumberInputs,
  SignUpForm,
} from "@features/Auth";
import { requestCode, verifyCode } from "@services/auth";

export function PhoneVerification() {
  const [name, setName] = useState<string>("");
  const [phoneNumberMiddle, setPhoneNumberMiddle] = useState<string>("");
  const [phoneNumberLast, setPhoneNumberLast] = useState<string>("");
  const [codeInput, setCodeInput] = useState<string>("");
  const [verified, setVerified] = useState<boolean>(false);

  const [sent, setSent] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(0);
  const [error, setError] = useState<string>("");

  const { showAlert } = useAlert();
  const { setNamePhone, data } = useSignup();

  const handleSendRequest = async () => {
    setError("");

    const phoneNumber = `010-${phoneNumberMiddle}-${phoneNumberLast}`;
    const response = await requestCode(phoneNumber);

    if (response.status === 204) {
      setSent(true);
      setTimer(180);
    } else if (response.data.error) {
      setError(response.data.error);
    } else {
      setError("오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const handleVerifyCode = async () => {
    setError("");

    const phoneNumber = `010-${phoneNumberMiddle}-${phoneNumberLast}`;
    const response = await verifyCode(phoneNumber, codeInput);

    if (response.status === 204) {
      setVerified(true);
      setError("");
      setNamePhone(name, phoneNumber);
      showAlert({
        title: "인증 성공",
        message: "전화번호 인증이 완료되었습니다.",
      });
    } else if (response.data.error) {
      setError(response.data.error);
    } else {
      setError("오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  useEffect(() => {
    let timerInterval: NodeJS.Timeout;
    if (timer > 0) {
      timerInterval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timerInterval);
  }, [timer]);

  useEffect(() => {
    if (data.mode === "naver") {
      setName(data.name);
    }
  }, [data]);

  const handleNext = () => {
    router.push("/signup/profile");
  };

  const formatTimer = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const isSendButtonActive =
    phoneNumberMiddle.length === 4 &&
    phoneNumberLast.length === 4 &&
    timer === 0;

  return (
    <SignUpForm
      title="전화번호를 인증해주세요!"
      subtitle={
        "안전하고 편리한 서비스 이용을 위해\n전화번호 인증을 진행해주세요."
      }
      buttonText="회원가입"
      buttonOnPress={handleNext}
      buttonDisabled={!verified || !name}
    >
      <Wrapper>
        <AuthInputTitle>이름</AuthInputTitle>
        <AuthTextInput
          value={name}
          onChangeText={setName}
          placeholder="이름을 입력해주세요."
          returnKeyType="next"
        />
      </Wrapper>
      <Wrapper>
        <AuthInputTitle>휴대폰 번호</AuthInputTitle>
        <Horizontal>
          <Inputs>
            <PhoneNumberInputs
              middleNumber={phoneNumberMiddle}
              lastNumber={phoneNumberLast}
              setMiddleNumber={setPhoneNumberMiddle}
              setLastNumber={setPhoneNumberLast}
            />
          </Inputs>
          <TextButton
            text={
              timer > 0 ? `재발송 (${formatTimer(timer)})` : "인증번호 전송"
            }
            onPress={handleSendRequest}
            fontSize={16}
            active={isSendButtonActive}
          />
        </Horizontal>
      </Wrapper>
      {sent && (
        <Wrapper>
          <AuthInputTitle>인증번호</AuthInputTitle>
          <Horizontal>
            <Inputs>
              <AuthTextInput
                value={codeInput}
                onChangeText={setCodeInput}
                placeholder="인증번호를 입력해주세요."
                type="number-pad"
                returnKeyType="done"
              />
            </Inputs>
            <TextButton
              text="인증하기"
              onPress={handleVerifyCode}
              fontSize={16}
              active={codeInput.length === 6 && !verified}
            />
          </Horizontal>
        </Wrapper>
      )}
      {error ? <ErrorText>{error}</ErrorText> : null}
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

const Horizontal = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;

const Inputs = styled.View`
  flex: 1;
`;
