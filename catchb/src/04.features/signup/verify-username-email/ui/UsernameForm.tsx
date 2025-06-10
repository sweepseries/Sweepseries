import { useUsernameEmail } from "../providers/UsernameEmailProvider";
import { InputField } from "@shared/lib/signup";

export function UsernameForm() {
  const { username, setUsername, usernameError } = useUsernameEmail();

  return (
    <InputField
      title="아이디"
      value={username}
      onChangeText={setUsername}
      placeholder="로그인 시 사용할 아이디를 입력해주세요."
      returnKeyType="next"
      errorMessage={usernameError}
    />
  );
}
