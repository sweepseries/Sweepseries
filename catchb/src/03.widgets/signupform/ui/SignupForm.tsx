import { Keyboard, Pressable, Text, View } from "react-native";

import { signupFormStyles } from "./styles";
import { useColors } from "@shared/lib/colors";
import { TextButton } from "@shared/ui/Buttons";
import { CatchBMainLogo } from "@shared/ui/Logo";

interface Props {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  buttonText: string;
  buttonOnPress: () => void;
  buttonDisabled: boolean;
}

export function SignUpForm({
  title,
  subtitle,
  children,
  buttonText,
  buttonOnPress,
  buttonDisabled,
}: Readonly<Props>) {
  const { colors } = useColors();
  const styles = signupFormStyles(colors);

  return (
    <Pressable onPress={Keyboard.dismiss} style={styles.formWrapper}>
      <View style={styles.background}>
        <CatchBMainLogo opacity={0.2} />
      </View>
      <View style={styles.contents}>
        <View style={styles.header}>
          <Text style={styles.titleText}>{title}</Text>
          {subtitle && <Text style={styles.subtitleText}>{subtitle}</Text>}
        </View>
        {children}
      </View>
      <TextButton
        text={buttonText}
        backgroundColor={colors.primary}
        onPress={buttonOnPress}
        fontSize={18}
        active={!buttonDisabled}
      />
    </Pressable>
  );
}
