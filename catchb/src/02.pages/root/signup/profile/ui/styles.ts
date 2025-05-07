import { StyleSheet } from "react-native";

import { ThemeColorType } from "@shared/lib/colors";

export const profileFormStyles = (colors: ThemeColorType) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "space-between",
      padding: 16,
      paddingBottom: 36,
      backgroundColor: colors.background,
    },
    contents: {
      flex: 1,
    },
    subtitle: {
      paddingVertical: 4,
      fontSize: 18,
      color: colors.highEmphasis,
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      color: colors.highEmphasis,
    },
    greenTitle: {
      color: colors.primary,
    },
    wrapper: {
      marginVertical: 12,
      gap: 12,
    },
    buttons: {
      flexDirection: "row",
      gap: 8,
    },
    submitButtonWrapper: {
      flex: 3,
    },
    skipButtonWrapper: {
      flex: 1,
    },
  });
