import { Text, View } from "react-native";
import { router } from "expo-router";

import { phoneVerificationPageStyles as styles } from "./styles";
import {
  PhoneVerificationProvider,
  usePhoneVerification,
} from "../provider/PhoneVerificationProvider";
import { SignUpForm } from "@widgets/signupform";
import { PhoneNumberInputs } from "@features/signup/verify-phonenumber";
import { AuthInputTitle, InputField } from "@shared/lib/signup";
import { TextButton } from "@shared/ui/Buttons";

export function PhoneNumberVerificationPage() {
  return (
    <PhoneVerificationProvider>
      <Components />
    </PhoneVerificationProvider>
  );
}

function Components() {
  const {
    name,
    phoneNumberMiddle,
    phoneNumberLast,
    codeInput,
    verified,
    sent,
    timer,
    error,
    setName,
    setPhoneNumberMiddle,
    setPhoneNumberLast,
    setCodeInput,
    sendRequest,
    checkCode,
  } = usePhoneVerification();

  const isSendButtonActive =
    phoneNumberMiddle.length === 4 &&
    phoneNumberLast.length === 4 &&
    !verified &&
    (timer === 0 || !sent);

  const handleNext = () => {
    router.push("/signup/profile");
  };

  const formatTimer = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

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
      <InputField
        title="이름"
        value={name}
        onChangeText={setName}
        placeholder="이름을 입력해주세요."
        returnKeyType="next"
      />
      <View style={styles.wrapper}>
        <AuthInputTitle>휴대폰 번호</AuthInputTitle>
        <View style={styles.horizontal}>
          <View style={styles.inputs}>
            <PhoneNumberInputs
              middleNumber={phoneNumberMiddle}
              lastNumber={phoneNumberLast}
              setMiddleNumber={setPhoneNumberMiddle}
              setLastNumber={setPhoneNumberLast}
              disabled={sent}
            />
          </View>
          <TextButton
            text={
              timer > 0 ? `재발송 (${formatTimer(timer)})` : "인증번호 전송"
            }
            onPress={sendRequest}
            fontSize={16}
            active={isSendButtonActive}
          />
        </View>
      </View>
      {sent && (
        <View style={styles.wrapper}>
          <AuthInputTitle>인증번호</AuthInputTitle>
          <View style={styles.horizontal}>
            <View style={styles.inputs}>
              <InputField
                value={codeInput}
                onChangeText={setCodeInput}
                placeholder="인증번호를 입력해주세요."
                type="number-pad"
                returnKeyType="done"
              />
            </View>
            <TextButton
              text="인증하기"
              onPress={checkCode}
              fontSize={16}
              active={codeInput.length === 6 && !verified && timer > 0}
            />
          </View>
        </View>
      )}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </SignUpForm>
  );
}
