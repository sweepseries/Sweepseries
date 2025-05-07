import { StyleSheet, Text, TouchableOpacity } from "react-native";

import { useColors } from "@shared/lib/colors";

interface Props {
  text: string;
  onPress: () => void;
  backgroundColor?: string;
  color?: string;
  fontSize?: number;
  active?: boolean;
}

export function TextButton({
  text,
  onPress,
  fontSize = 16,
  backgroundColor = "#14863E",
  color = "#FFFFFF",
  active = true,
}: Readonly<Props>) {
  const { colors } = useColors();

  backgroundColor = active ? backgroundColor : colors.border;
  color = active ? color : colors.lowEmphasis;
  const borderColor = active ? color : "transparent";

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor,
          borderColor: borderColor,
        },
      ]}
      onPress={onPress}
      disabled={!active}
      testID="text-button"
    >
      <Text
        style={[
          styles.text,
          {
            color,
            fontSize,
          },
        ]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
    borderWidth: 0.5,
  },
  text: {
    fontWeight: "bold",
    textAlign: "center",
    lineHeight: 24,
    includeFontPadding: false,
  },
});
