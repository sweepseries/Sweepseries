import { StyleSheet, Text, TouchableOpacity } from "react-native";

import { useTheme } from "@contexts/theme";

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
  const { theme } = useTheme();

  backgroundColor = active ? backgroundColor : theme.border;
  color = active ? color : theme.lowEmphasis;
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
