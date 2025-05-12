import { Text } from "react-native";
import { router } from "expo-router";

import { phoneVerificationPageStyles as styles } from "./styles";
import {
  NameForm,
  PhonenumberForm,
  PhoneVerificationProvider,
  usePhoneVerification,
  VerificationCodeForm,
} from "@features/signup/verify-phonenumber";
import { SignUpForm } from "@widgets/signupform";

export function PhoneNumberVerificationPage() {
  return (
    <PhoneVerificationProvider>
      <Components />
    </PhoneVerificationProvider>
  );
}

function Components() {
  const { name, verified, error } = usePhoneVerification();

  const handleNext = () => {
    router.push("/signup/profile");
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
      <NameForm />
      <PhonenumberForm />
      <VerificationCodeForm />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </SignUpForm>
  );
}
