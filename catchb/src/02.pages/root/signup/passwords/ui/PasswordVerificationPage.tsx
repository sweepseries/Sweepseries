import {
  PasswordCheckForm,
  PasswordForm,
  PasswordsProvider,
  usePasswordVerification,
} from "@features/signup/verify-password";
import { SignUpForm } from "@widgets/signupform";

export function PasswordVerificationPage() {
  return (
    <PasswordsProvider>
      <Components />
    </PasswordsProvider>
  );
}

function Components() {
  const { password, password2, goToNextPage } = usePasswordVerification();

  const isButtonActive = !!password && !!password2;

  return (
    <SignUpForm
      title="비밀번호를 설정해주세요!"
      subtitle={"영문+숫자+특수문자 조합으로\n8자리 이상 입력해주세요."}
      buttonText="다음으로"
      buttonOnPress={goToNextPage}
      buttonDisabled={!isButtonActive}
    >
      <PasswordForm />
      <PasswordCheckForm />
    </SignUpForm>
  );
}
