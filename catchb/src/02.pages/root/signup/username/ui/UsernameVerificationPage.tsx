import { SignUpForm } from "@widgets/signupform";
import {
  UsernameEmailProvider,
  useUsernameEmail,
} from "@features/signup/verify-username-email";
import { InputField } from "@shared/lib/signup";

export function UsernameEmailVerificationPage() {
  return (
    <UsernameEmailProvider>
      <Components />
    </UsernameEmailProvider>
  );
}

function Components() {
  const {
    username,
    email,
    usernameError,
    emailError,
    isButtonActive,
    setUsername,
    setEmail,
    goToNextPage,
  } = useUsernameEmail();

  return (
    <SignUpForm
      title="아이디와 이메일 주소를 입력해주세요!"
      buttonText="다음으로"
      buttonOnPress={goToNextPage}
      buttonDisabled={!isButtonActive}
    >
      <InputField
        title="아이디"
        value={username}
        onChangeText={setUsername}
        placeholder="로그인 시 사용할 아이디를 입력해주세요."
        returnKeyType="next"
        errorMessage={usernameError}
      />
      <InputField
        title="이메일"
        value={email}
        onChangeText={setEmail}
        placeholder="이메일을 입력해주세요."
        type="email-address"
        errorMessage={emailError}
      />
    </SignUpForm>
  );
}
