import { SvgProps } from "react-native-svg";

import CalendarNumber from "./files/calendar-number.svg";
import CheckCircle from "./files/check-circle.svg";
import ChevronDown from "./files/chevron-down.svg";
import ChevronLeft from "./files/chevron-left.svg";
import ChevronRight from "./files/chevron-right.svg";
import ChevronUp from "./files/chevron-up.svg";
import Desk from "./files/desk.svg";
import Home from "./files/home.svg";
import Logout from "./files/logout.svg";
import People from "./files/people.svg";
import PersonCircle from "./files/person-circle.svg";

interface Props {
  icon: string;
  size?: number;
  color?: string;
}

const iconMap: Record<string, React.FC<SvgProps>> = {
  "calendar-number": CalendarNumber,
  "check-circle": CheckCircle,
  "chevron-down": ChevronDown,
  "chevron-left": ChevronLeft,
  "chevron-right": ChevronRight,
  "chevron-up": ChevronUp,
  desk: Desk,
  home: Home,
  logout: Logout,
  people: People,
  "person-circle": PersonCircle,
};

export const AppIcon = ({ icon, size = 24, color = "#000" }: Props) => {
  const IconComponent = iconMap[icon];

  if (!IconComponent) {
    return null;
  }

  return (
    <IconComponent width={size} height={size} fill={color} color={color} />
  );
};
