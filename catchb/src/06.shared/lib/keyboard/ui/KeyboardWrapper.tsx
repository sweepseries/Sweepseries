import { useContext } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BottomTabBarHeightContext } from "@react-navigation/bottom-tabs";

interface Props {
  children: React.ReactNode;
  padding?: number;
}

export function KeyboardWrapper({ children, padding = 0 }: Readonly<Props>) {
  const BOTTOM_TABS_HEIGHT = useContext(BottomTabBarHeightContext) || 0;
  const insets = useSafeAreaInsets();

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.select({ ios: "padding", android: "height" })}
      keyboardVerticalOffset={BOTTOM_TABS_HEIGHT + insets.bottom - padding}
    >
      <Pressable style={styles.flex} onPress={Keyboard.dismiss}>
        {children}
      </Pressable>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
});
