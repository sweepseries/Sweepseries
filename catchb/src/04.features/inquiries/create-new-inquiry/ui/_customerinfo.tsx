import { Text, TextInput, View } from "react-native";

import { useInquiryForm } from "../provider/InquiryFormProvider";
import { formStyles } from "./styles";
import { useColors } from "@shared/lib/colors";

export function CustomerInformationSegment() {
  const { name, setName, email, setEmail, phone, setPhone } = useInquiryForm();
  const { colors } = useColors();
  const styles = formStyles(colors);

  return (
    <View style={styles.segment}>
      <Text style={styles.subtitle}>고객정보</Text>
      <TextInput
        style={styles.input}
        placeholder="이름"
        placeholderTextColor={colors.lowEmphasis}
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="이메일"
        placeholderTextColor={colors.lowEmphasis}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="전화번호"
        placeholderTextColor={colors.lowEmphasis}
        value={phone}
        onChangeText={setPhone}
      />
    </View>
  );
}
