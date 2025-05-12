import { Keyboard, Pressable, Text, View } from "react-native";

import { profileFormStyles } from "./styles";
import {
  BirthdateForm,
  GenderForm,
  NicknameForm,
  ProfileFormProvider,
  RegisterButtons,
} from "@features/signup/fill-profile";
import { useColors } from "@shared/lib/colors";

export function ProfileFormPage() {
  return (
    <ProfileFormProvider>
      <Components />
    </ProfileFormProvider>
  );
}

function Components() {
  const { colors } = useColors();
  const styles = profileFormStyles(colors);

  return (
    <Pressable onPress={Keyboard.dismiss} style={styles.container}>
      <View style={styles.contents}>
        <Text style={styles.title}>
          <Text style={styles.greenTitle}>Catch B </Text>가입을 환영합니다 !
        </Text>
        <Text style={styles.subtitle}>프로필을 완성해주세요</Text>
        <NicknameForm />
        <BirthdateForm />
        <GenderForm />
      </View>
      <RegisterButtons />
    </Pressable>
  );
}
