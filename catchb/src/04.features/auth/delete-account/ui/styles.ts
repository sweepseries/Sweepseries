import { StyleSheet } from "react-native";

import { ThemeColorType } from "@shared/lib/colors";

export const withdrawReasonStyles = (colors: ThemeColorType) =>
  StyleSheet.create({
    reasonButton: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 4,
      gap: 12,
    },
    reasonText: {
      fontSize: 16,
      color: colors.highEmphasis,
    },
  });
