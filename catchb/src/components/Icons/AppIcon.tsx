import { SvgCssUri } from "react-native-svg/css";

interface Props {
  icon: string;
  color?: string;
  size?: number;
}

export function AppIcon({ icon, color = "black", size = 28 }: Readonly<Props>) {
  return (
    <SvgCssUri
      width={size}
      height={size}
      uri={`https://kr.object.ncloudstorage.com/sweep.resources/icons/${icon}.svg`}
      color={color}
    />
  );
}
