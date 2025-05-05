import { useEffect, useRef } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { alertStyles } from "./styles";
import { AlertProps } from "../types";
import { useColors } from "@shared/lib/colors";
import { Divider } from "@shared/ui/Dividers";

export function CatchBAlert({
  title,
  message,
  onConfirm,
  confirmText = "확인",
}: Readonly<AlertProps>) {
  const opacity = useRef(new Animated.Value(0)).current;
  const { colors } = useColors();
  const styles = alertStyles(colors);

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [opacity]);

  return (
    <Animated.View
      style={[StyleSheet.absoluteFill, styles.backdrop, { opacity }]}
    >
      <View style={styles.contents}>
        {title && <Text style={styles.title}>{title}</Text>}
        <Text style={styles.message}>{message}</Text>
        <View style={styles.dividerWrapper}>
          <Divider />
        </View>
        <TouchableOpacity
          onPress={onConfirm}
          style={styles.button}
          testID="confirm"
        >
          <Text style={styles.buttonText}>{confirmText}</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}
