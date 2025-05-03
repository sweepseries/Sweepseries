import { StyleSheet } from "react-native";

import { ThemeColorType } from "@shared/lib/colors";

export const loginPageStyles = (colors: ThemeColorType) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      backgroundColor: colors.background,
    },
    troubleShootWrapper: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 36,
    },
    backButtonWrapper: {
      width: "100%",
      marginTop: 24,
      paddingHorizontal: 24,
    },
  });
