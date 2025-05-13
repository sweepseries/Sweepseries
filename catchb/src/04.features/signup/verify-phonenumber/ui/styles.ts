import { StyleSheet } from "react-native";

export const formStyles = StyleSheet.create({
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
});