import { View } from "react-native";

interface VerticalProps {
  width?: number;
  color?: string;
}

export function VerticalDivider({
  width = 1,
  color = "#D9D9D9",
}: Readonly<VerticalProps>) {
  return (
    <View
      style={{
        height: "100%",
        backgroundColor: color,
        width: width,
      }}
    />
  );
}
