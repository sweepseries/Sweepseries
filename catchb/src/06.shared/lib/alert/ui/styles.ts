import { StyleSheet } from "react-native";

import { ThemeColorType } from "@shared/lib/colors";

export const alertStyles = (colors: ThemeColorType) =>
  StyleSheet.create({
    backdrop: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.4)",
      justifyContent: "center",
      alignItems: "center",
    },
    contents: {
      alignItems: "center",
      width: "80%",
      paddingTop: 16,
      paddingBottom: 12,
      paddingHorizontal: 24,
      gap: 12,
      backgroundColor: colors.background,
      borderRadius: 8,
    },
    title: {
      textAlign: "center",
      fontSize: 18,
      fontWeight: "600",
      color: colors.primary,
    },
    message: {
      textAlign: "center",
      fontSize: 16,
      lineHeight: 20,
      color: colors.mediumEmphasis,
    },
    dividerWrapper: {
      width: "60%",
    },
    button: {
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
    },
    buttonText: {
      fontSize: 16,
      fontWeight: "600",
      color: colors.primary,
    },
  });
