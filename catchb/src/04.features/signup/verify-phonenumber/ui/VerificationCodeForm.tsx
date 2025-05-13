import { View } from "react-native";

import { usePhoneVerification } from "../provider/PhoneVerificationProvider";
import { formStyles as styles } from "./styles";
import { AuthInputTitle, InputField } from "@shared/lib/signup";
import { TextButton } from "@shared/ui/Buttons";

export function VerificationCodeForm() {
  const { codeInput, verified, sent, timer, setCodeInput, checkCode } =
    usePhoneVerification();

  if (!sent) return null;

  return (
    <View style={styles.wrapper}>
      <AuthInputTitle>인증번호</AuthInputTitle>
      <View style={styles.horizontal}>
        <View style={styles.inputs}>
          <InputField
            value={codeInput}
            onChangeText={setCodeInput}
            placeholder="인증번호를 입력해주세요."
            type="number-pad"
            returnKeyType="done"
          />
        </View>
        <TextButton
          text="인증하기"
          onPress={checkCode}
          fontSize={16}
          active={codeInput.length === 6 && !verified && timer > 0}
        />
      </View>
    </View>
  );
}
