import {
  PasswordsProvider,
  usePasswordVerification,
} from "../provider/PasswordsProvider";
import { SignUpForm } from "@widgets/signupform";
import { InputField } from "@shared/lib/signup";

export function PasswordVerificationPage() {
  return (
    <PasswordsProvider>
      <Components />
    </PasswordsProvider>
  );
}

function Components() {
  const {
    password,
    password2,
    passwordError,
    isButtonActive,
    setPassword,
    setPassword2,
    goToNextPage,
  } = usePasswordVerification();

  return (
    <SignUpForm
      title="비밀번호를 설정해주세요!"
      subtitle={"영문+숫자+특수문자 조합으로\n8자리 이상 입력해주세요."}
      buttonText="다음으로"
      buttonOnPress={goToNextPage}
      buttonDisabled={!isButtonActive}
    >
      <InputField
        title="비밀번호"
        value={password}
        onChangeText={setPassword}
        placeholder="영문+숫자+특수문자 조합으로 8자리 이상"
        secureTextEntry
        returnKeyType="next"
      />
      <InputField
        title="비밀번호 확인"
        value={password2}
        onChangeText={setPassword2}
        placeholder="비밀번호를 다시 입력해주세요."
        secureTextEntry
        returnKeyType="done"
        errorMessage={passwordError}
      />
    </SignUpForm>
  );
}
