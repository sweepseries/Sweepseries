import { StyleSheet } from "react-native";

import { ThemeColorType } from "@shared/lib/colors";

export const signupFormStyles = (colors: ThemeColorType) =>
  StyleSheet.create({
    formWrapper: {
      flex: 1,
      padding: 16,
      paddingBottom: 36,
      backgroundColor: colors.background,
    },
    background: {
      alignItems: "center",
      justifyContent: "center",
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    contents: {
      flex: 1,
      paddingVertical: 16,
      gap: 16,
    },
    header: {
      gap: 8,
    },
    titleText: {
      fontSize: 20,
      fontWeight: "bold",
      color: colors.highEmphasis,
    },
    subtitleText: {
      fontSize: 16,
      color: colors.mediumEmphasis,
    },
  });
