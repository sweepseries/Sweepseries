import { StyleSheet } from "react-native";

import { ThemeColorType } from "@shared/lib/colors";

export const withdrawPageStyles = (colors: ThemeColorType) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 16,
      paddingVertical: 8,
      gap: 12,
      backgroundColor: colors.background,
    },
    wrapper: {
      flex: 1,
    },
    title: {
      fontSize: 20,
      color: colors.highEmphasis,
    },
    helper: {
      fontSize: 16,
      color: colors.lowEmphasis,
    },
    checkButtons: {
      marginTop: 12,
      gap: 12,
    },
    input: {
      height: 100,
      marginTop: 12,
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors.border,
    },
  });
