import { View } from "react-native";
import { router } from "expo-router";

import { loginPageStyles } from "./styles";
import { AuthHeader } from "@widgets/authheader";
import { CatchBLoginForm } from "@features/auth/catchb-login";
import { FindPassword } from "@features/auth/find-password";
import { FindUsername } from "@features/auth/find-username";
import { useColors } from "@shared/lib/colors";
import { KeyboardWrapper } from "@shared/lib/keyboard";
import { TextButton } from "@shared/ui/Buttons";
import { VerticalDivider } from "@shared/ui/Dividers";

export function LoginPage() {
  const { colors } = useColors();
  const styles = loginPageStyles(colors);

  const goBackToLandingPage = () => {
    router.back();
  };

  return (
    <KeyboardWrapper padding={36}>
      <View style={styles.container}>
        <AuthHeader />
        <CatchBLoginForm />
        <View style={styles.troubleShootWrapper}>
          <FindUsername />
          <VerticalDivider />
          <FindPassword />
        </View>
        <View style={styles.backButtonWrapper}>
          <TextButton
            text="돌아가기"
            onPress={goBackToLandingPage}
            backgroundColor={colors.background}
            color={colors.lowEmphasis}
            borderColor={colors.lowEmphasis}
          />
        </View>
      </View>
    </KeyboardWrapper>
  );
}
