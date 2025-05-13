import { SignUpForm } from "@widgets/signupform";
import {
  EmailForm,
  UsernameEmailProvider,
  UsernameForm,
  useUsernameEmail,
} from "@features/signup/verify-username-email";

export function UsernameEmailVerificationPage() {
  return (
    <UsernameEmailProvider>
      <Components />
    </UsernameEmailProvider>
  );
}

function Components() {
  const { username, email, goToNextPage } = useUsernameEmail();

  const isButtonActive = !!username && !!email;

  return (
    <SignUpForm
      title="아이디와 이메일 주소를 입력해주세요!"
      buttonText="다음으로"
      buttonOnPress={goToNextPage}
      buttonDisabled={!isButtonActive}
    >
      <UsernameForm />
      <EmailForm />
    </SignUpForm>
  );
}
