import { usePasswordVerification } from "../providers/PasswordsProvider";
import { InputField } from "@shared/lib/signup";

export function PasswordCheckForm() {
  const { password2, passwordError, setPassword2 } = usePasswordVerification();

  return (
    <InputField
      title="비밀번호 확인"
      value={password2}
      onChangeText={setPassword2}
      placeholder="비밀번호를 다시 입력해주세요."
      secureTextEntry
      returnKeyType="done"
      errorMessage={passwordError}
    />
  );
}
