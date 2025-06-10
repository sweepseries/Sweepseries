import { View } from "react-native";

import { usePhoneVerification } from "../providers/PhoneVerificationProvider";
import { PhoneNumberInputs } from "./_phonenumberinputs";
import { formStyles as styles } from "./styles";
import { formatTimer } from "@shared/lib/datetime";
import { AuthInputTitle } from "@shared/lib/signup";
import { TextButton } from "@shared/ui/Buttons";

export function PhonenumberForm() {
  const {
    phoneNumberMiddle,
    phoneNumberLast,
    sent,
    verified,
    timer,
    setPhoneNumberMiddle,
    setPhoneNumberLast,
    sendRequest,
  } = usePhoneVerification();

  const isSendButtonActive =
    phoneNumberMiddle.length === 4 &&
    phoneNumberLast.length === 4 &&
    !verified &&
    (timer === 0 || !sent);

  return (
    <View style={styles.wrapper}>
      <AuthInputTitle>휴대폰 번호</AuthInputTitle>
      <View style={styles.horizontal}>
        <View style={styles.inputs}>
          <PhoneNumberInputs
            middleNumber={phoneNumberMiddle}
            lastNumber={phoneNumberLast}
            setMiddleNumber={setPhoneNumberMiddle}
            setLastNumber={setPhoneNumberLast}
            disabled={sent}
          />
        </View>
        <TextButton
          text={timer > 0 ? `재발송 (${formatTimer(timer)})` : "인증번호 전송"}
          onPress={sendRequest}
          fontSize={16}
          active={isSendButtonActive}
        />
      </View>
    </View>
  );
}
