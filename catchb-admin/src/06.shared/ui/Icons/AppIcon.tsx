import Announcement from "./files/announcement.svg?react";
import ArrowDown from "./files/arrow-down.svg?react";
import ArrowUp from "./files/arrow-up.svg?react";
import Bold from "./files/bold.svg?react";
import BulletList from "./files/bullet-list.svg?react";
import Category from "./files/category.svg?react";
import Close from "./files/close.svg?react";
import ChevronDown from "./files/chevron-down.svg?react";
import ChevronLeft from "./files/chevron-left.svg?react";
import ChevronRight from "./files/chevron-right.svg?react";
import ChevronUp from "./files/chevron-up.svg?react";
import Dashboard from "./files/dashboard.svg?react";
import Document from "./files/document.svg?react";
import H1 from "./files/h1.svg?react";
import H2 from "./files/h2.svg?react";
import H3 from "./files/h3.svg?react";
import Italic from "./files/italic.svg?react";
import Logout from "./files/logout.svg?react";
import NumberedList from "./files/numbered-list.svg?react";
import Paragraph from "./files/paragraph.svg?react";
import Pencil from "./files/pencil.svg?react";
import People from "./files/people.svg?react";
import Pin from "./files/pin.svg?react";
import Question from "./files/question.svg?react";
import Redo from "./files/redo.svg?react";
import SidebarClose from "./files/sidebar-close.svg?react";
import SidebarOpen from "./files/sidebar-open.svg?react";
import Sort from "./files/sort.svg?react";
import Status from "./files/status.svg?react";
import Strikethrough from "./files/strikethrough.svg?react";
import Support from "./files/support.svg?react";
import Trash from "./files/trash.svg?react";
import Undo from "./files/undo.svg?react";
import User from "./files/user.svg?react";

interface Props {
  icon: string;
  size?: number;
  color?: string;
}

const iconMap: Record<
  string,
  React.FunctionComponent<React.SVGProps<SVGSVGElement>>
> = {
  announcement: Announcement,
  "arrow-down": ArrowDown,
  "arrow-up": ArrowUp,
  bold: Bold,
  "bullet-list": BulletList,
  category: Category,
  "chevron-down": ChevronDown,
  "chevron-left": ChevronLeft,
  "chevron-right": ChevronRight,
  "chevron-up": ChevronUp,
  close: Close,
  dashboard: Dashboard,
  document: Document,
  h1: H1,
  h2: H2,
  h3: H3,
  italic: Italic,
  logout: Logout,
  "numbered-list": NumberedList,
  paragraph: Paragraph,
  pencil: Pencil,
  people: People,
  pin: Pin,
  question: Question,
  redo: Redo,
  "sidebar-close": SidebarClose,
  "sidebar-open": SidebarOpen,
  sort: Sort,
  status: Status,
  strikethrough: Strikethrough,
  support: Support,
  trash: Trash,
  undo: Undo,
  user: User,
};

export function AppIcon({ icon, size = 24, color = "black" }: Readonly<Props>) {
  const IconComponent = iconMap[icon];

  if (!IconComponent) {
    console.error(`Icon "${icon}" not found.`);
    return null;
  }

  return <IconComponent width={size} height={size} color={color} />;
}
