import { usePhoneVerification } from "../providers/PhoneVerificationProvider";
import { InputField } from "@shared/lib/signup";

export function NameForm() {
  const { name, setName } = usePhoneVerification();

  return (
    <InputField
      title="이름"
      value={name}
      onChangeText={setName}
      placeholder="이름을 입력해주세요."
      returnKeyType="next"
    />
  );
}
