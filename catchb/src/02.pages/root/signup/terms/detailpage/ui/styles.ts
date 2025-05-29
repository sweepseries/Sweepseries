import { StyleSheet } from "react-native";

import { ThemeColorType } from "@shared/lib/colors";

export const termsDetailPageStyles = (colors: ThemeColorType) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingVertical: 24,
      paddingHorizontal: 16,
      backgroundColor: colors.background,
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      color: colors.highEmphasis,
    },
    content: {
      flex: 1,
      lineHeight: 24,
    },
    divider: {
      marginTop: 16,
      marginBottom: 8,
    },
  });
