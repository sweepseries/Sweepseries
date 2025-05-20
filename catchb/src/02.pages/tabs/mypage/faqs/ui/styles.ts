import { StyleSheet } from "react-native";

import { ThemeColorType } from "@shared/lib/colors";

export const listPageStyles = (colors: ThemeColorType) =>
  StyleSheet.create({
    scrollview: {
      flex: 1,
      backgroundColor: colors.background,
      overflow: "visible",
    },
    contents: {
      paddingBottom: 128,
      gap: 12,
    },
  });
