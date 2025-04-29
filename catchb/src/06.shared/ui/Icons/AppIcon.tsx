import { SvgProps } from "react-native-svg";

import ChevronDown from "./files/chevron-down.svg";
import ChevronUp from "./files/chevron-up.svg";

interface Props {
  icon: string;
  size?: number;
  color?: string;
}

const iconMap: Record<string, React.FC<SvgProps>> = {
  "chevron-down": ChevronDown,
  "chevron-up": ChevronUp,
};

export const AppIcon = ({ icon, size = 20, color = "#000" }: Props) => {
  const IconComponent = iconMap[icon];

  if (!IconComponent) {
    return null;
  }

  return <IconComponent width={size} height={size} color={color} />;
};
