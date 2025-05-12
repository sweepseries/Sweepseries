import { Keyboard, Pressable, Text, View } from "react-native";

import { profileFormStyles } from "./styles";
import {
  ProfileFormProvider,
  useProfileForm,
} from "../provider/ProfileFormProvider";
import { BirthdateInputs } from "@features/signup/fill-profile";
import { useColors } from "@shared/lib/colors";
import { AuthInputTitle, InputField } from "@shared/lib/signup";
import { TextButton } from "@shared/ui/Buttons";
import { Selector } from "@shared/ui/Selectors";

export function ProfileFormPage() {
  return (
    <ProfileFormProvider>
      <Components />
    </ProfileFormProvider>
  );
}

function Components() {
  const {
    nickname,
    birthYear,
    birthMonth,
    birthDate,
    gender,
    setNickname,
    setBirthYear,
    setBirthMonth,
    setBirthDate,
    setGender,
    submit,
  } = useProfileForm();
  const { colors } = useColors();
  const styles = profileFormStyles(colors);

  return (
    <Pressable onPress={Keyboard.dismiss} style={styles.container}>
      <View style={styles.contents}>
        <Text style={styles.title}>
          <Text style={styles.title}>Catch B </Text>가입을 환영합니다 !
        </Text>
        <Text style={styles.subtitle}>프로필을 완성해주세요</Text>
        <InputField
          title="닉네임"
          value={nickname}
          onChangeText={setNickname}
          placeholder="닉네임을 입력해주세요"
          returnKeyType="next"
        />
        <View style={styles.wrapper}>
          <AuthInputTitle>생년월일</AuthInputTitle>
          <BirthdateInputs
            year={birthYear}
            month={birthMonth}
            day={birthDate}
            setYear={setBirthYear}
            setMonth={setBirthMonth}
            setDay={setBirthDate}
          />
        </View>
        <View style={styles.wrapper}>
          <AuthInputTitle>성별</AuthInputTitle>
          <Selector
            options={["남성", "여성", "기타"]}
            selected={gender}
            onSelect={setGender}
          />
        </View>
      </View>
      <View style={styles.buttons}>
        <View style={styles.submitButtonWrapper}>
          <TextButton
            text="시작하기"
            onPress={() => submit("submit")}
            backgroundColor={colors.primary}
          />
        </View>
        <View style={styles.skipButtonWrapper}>
          <TextButton
            text="다음에"
            onPress={() => submit("skip")}
            backgroundColor={colors.background}
            color={colors.lowEmphasis}
          />
        </View>
      </View>
    </Pressable>
  );
}
