import { StyleSheet } from "react-native";

import { ThemeColorType } from "@shared/lib/colors";

export const landingPageStyles = (colors: ThemeColorType) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      gap: 16,
      backgroundColor: colors.background,
    },
    buttonsWrapper: {
      justifyContent: "center",
      width: "100%",
      paddingHorizontal: 24,
      gap: 8,
    },
    dividerWrapper: {
      width: "100%",
      paddingHorizontal: 24,
    },
    actionsWrapper: {
      width: "100%",
      paddingHorizontal: 24,
      gap: 8,
    },
    guideText: {
      textAlign: "center",
      fontSize: 16,
      color: colors.mediumEmphasis,
    },
    emphasisText: {
      fontWeight: "bold",
      color: colors.primary,
    },
  });
