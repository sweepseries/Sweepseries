import { Text, TextInput, View } from "react-native";

import { useInquiryForm } from "../provider/InquiryFormProvider";
import { formStyles } from "./styles";
import { useColors } from "@shared/lib/colors";

export function CustomerInformationSegment() {
  const { name, setName, email, setEmail, isGuestMode } = useInquiryForm();
  const { colors } = useColors();
  const styles = formStyles(colors);

  return (
    <View style={styles.segment}>
      <Text style={styles.subtitle}>고객정보</Text>
      <TextInput
        style={[styles.input, !isGuestMode && styles.disabled]}
        placeholder="이름"
        placeholderTextColor={colors.lowEmphasis}
        value={name}
        onChangeText={setName}
        editable={isGuestMode}
        testID="name-input"
      />
      <TextInput
        style={[styles.input, !isGuestMode && styles.disabled]}
        placeholder="이메일"
        placeholderTextColor={colors.lowEmphasis}
        value={email}
        onChangeText={setEmail}
        editable={isGuestMode}
        testID="email-input"
      />
    </View>
  );
}
