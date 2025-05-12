import { StyleSheet } from "react-native";

import { ThemeColorType } from "@shared/lib/colors";

export const myPageStyles = (colors: ThemeColorType) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 16,
      backgroundColor: colors.background,
    },
    footer: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: 16,
      paddingVertical: 8,
    },
  });
