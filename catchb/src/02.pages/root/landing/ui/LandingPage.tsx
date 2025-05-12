import { Text, View } from "react-native";
import { router } from "expo-router";

import { landingPageStyles } from "./styles";
import { AuthHeader } from "@widgets/authheader";
import { KakaoLogin } from "@features/auth/kakao-login";
import { NaverLogin } from "@features/auth/naver-login";
import { useColors } from "@shared/lib/colors";
import { LoginButton, LoginButtonText, TextButton } from "@shared/ui/Buttons";
import { Divider } from "@shared/ui/Dividers";

export function LandingPage() {
  const { colors } = useColors();
  const styles = landingPageStyles(colors);

  const goToLoginPage = () => {
    router.push("/login");
  };

  const goToSignupPage = () => {
    router.push({
      pathname: "/signup/terms",
      params: { mode: "catchb" },
    });
  };

  const navigateAsGuest = () => {
    router.replace("/home");
  };

  return (
    <View style={styles.container}>
      <AuthHeader />
      <View style={styles.buttonsWrapper}>
        <NaverLogin />
        <KakaoLogin />
        <LoginButton
          onPress={goToLoginPage}
          style={{ backgroundColor: colors.primary }}
        >
          <LoginButtonText>이메일로 로그인</LoginButtonText>
        </LoginButton>
      </View>
      <View style={styles.dividerWrapper}>
        <Divider />
      </View>
      <View style={styles.actionsWrapper}>
        <Text style={styles.guideText}>
          아직<Text style={styles.emphasisText}> Catch B</Text> 회원이
          아니신가요?
        </Text>
        <TextButton
          text="이메일로 가입하기"
          onPress={goToSignupPage}
          backgroundColor={colors.background}
          color={colors.lowEmphasis}
          borderColor={colors.lowEmphasis}
        />
        <TextButton
          text="비회원으로 둘러보기"
          onPress={navigateAsGuest}
          backgroundColor={colors.background}
          color={colors.lowEmphasis}
          borderColor={colors.lowEmphasis}
        />
      </View>
    </View>
  );
}
