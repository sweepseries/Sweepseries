import { SvgProps } from "react-native-svg";

import CalendarNumber from "./files/calendar-number.svg";
import Chat from "./files/chat.svg";
import CheckCircle from "./files/check-circle.svg";
import Check from "./files/check.svg";
import ChevronDown from "./files/chevron-down.svg";
import ChevronLeft from "./files/chevron-left.svg";
import ChevronRight from "./files/chevron-right.svg";
import ChevronUp from "./files/chevron-up.svg";
import Close from "./files/close.svg";
import Copy from "./files/copy.svg";
import Desk from "./files/desk.svg";
import Envelope from "./files/envelope.svg";
import Error from "./files/error.svg";
import Home from "./files/home.svg";
import LightBulb from "./files/lightbulb.svg";
import Logout from "./files/logout.svg";
import Pencil from "./files/pencil.svg";
import People from "./files/people.svg";
import PersonCircle from "./files/person-circle.svg";
import PersonMinus from "./files/person-minus.svg";
import QuestionmarkCircle from "./files/questionmark-circle.svg";
import WarningCircle from "./files/warning-circle.svg";

interface Props {
  icon: string;
  size?: number;
  color?: string;
}

const iconMap: Record<string, React.FC<SvgProps>> = {
  "calendar-number": CalendarNumber,
  chat: Chat,
  "check-circle": CheckCircle,
  check: Check,
  "chevron-down": ChevronDown,
  "chevron-left": ChevronLeft,
  "chevron-right": ChevronRight,
  "chevron-up": ChevronUp,
  close: Close,
  copy: Copy,
  desk: Desk,
  envelope: Envelope,
  error: Error,
  home: Home,
  lightbulb: LightBulb,
  logout: Logout,
  pencil: Pencil,
  people: People,
  "person-circle": PersonCircle,
  "person-minus": PersonMinus,
  "questionmark-circle": QuestionmarkCircle,
  "warning-circle": WarningCircle,
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
