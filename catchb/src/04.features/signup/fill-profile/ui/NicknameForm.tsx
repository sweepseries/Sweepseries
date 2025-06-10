import { useProfileForm } from "../providers/ProfileFormProvider";
import { InputField } from "@shared/lib/signup";

export function NicknameForm() {
  const { nickname, setNickname } = useProfileForm();

  return (
    <InputField
      title="닉네임"
      value={nickname}
      onChangeText={setNickname}
      placeholder="닉네임을 입력해주세요"
      returnKeyType="next"
    />
  );
}
