import { StyleSheet } from "react-native";

import { ThemeColorType } from "@shared/lib/colors";

export const formStyles = (colors: ThemeColorType) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 24,
      paddingVertical: 16,
      gap: 16,
      backgroundColor: colors.background,
    },
    segment: {
      gap: 8,
    },
    subtitle: {
      marginVertical: 4,
      paddingHorizontal: 8,
      fontSize: 16,
      fontWeight: "bold",
      color: colors.highEmphasis,
    },
    input: {
      textAlignVertical: "top",
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: colors.border,
    },
    footer: {
      gap: 16,
    },
    footerContents: {
      borderRadius: 4,
      borderWidth: 1,
      borderColor: colors.border,
    },
    footerTitle: {
      paddingHorizontal: 4,
      fontSize: 16,
      fontWeight: "bold",
      color: colors.highEmphasis,
    },
    guideWrapper: {
      paddingHorizontal: 12,
      paddingVertical: 8,
      gap: 8,
    },
    guideText: {
      fontSize: 14,
      lineHeight: 18,
      color: colors.mediumEmphasis,
    },
    checkbox: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 16,
      paddingHorizontal: 12,
      gap: 8,
    },
    checkboxText: {
      fontSize: 14,
      color: colors.mediumEmphasis,
    },
    buttons: {
      flexDirection: "row",
      alignItems: "center",
      width: "100%",
      gap: 8,
    },
    mainButtonWrapper: {
      flex: 3,
    },
    cancelButtonWrapper: {
      flex: 1,
    },
  });
