import { useUsernameEmail } from "../provider/UsernameEmailProvider";
import { InputField } from "@shared/lib/signup";

export function EmailForm() {
  const { email, emailError, setEmail } = useUsernameEmail();

  return (
    <InputField
      title="이메일"
      value={email}
      onChangeText={setEmail}
      placeholder="이메일을 입력해주세요."
      type="email-address"
      errorMessage={emailError}
    />
  );
}
