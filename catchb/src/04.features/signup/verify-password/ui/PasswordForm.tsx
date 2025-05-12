import { usePasswordVerification } from "../provider/PasswordsProvider";
import { InputField } from "@shared/lib/signup";

export function PasswordForm() {
  const { password, setPassword } = usePasswordVerification();

  return (
    <InputField
      title="비밀번호"
      value={password}
      onChangeText={setPassword}
      placeholder="영문+숫자+특수문자 조합으로 8자리 이상"
      secureTextEntry
      returnKeyType="next"
    />
  );
}
