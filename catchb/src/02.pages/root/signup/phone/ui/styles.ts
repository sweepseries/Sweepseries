import { StyleSheet } from "react-native";

export const phoneVerificationPageStyles = StyleSheet.create({
  wrapper: {
    marginVertical: 8,
    gap: 8,
  },
  horizontal: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  inputs: {
    flex: 1,
  },
  errorText: {
    marginTop: -16,
    color: "rgba(255, 0, 0, 0.8)",
    fontSize: 14,
    textAlign: "left",
  },
});
