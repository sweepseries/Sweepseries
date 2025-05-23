import Announcement from "./files/announcement.svg?react";
import Dashboard from "./files/dashboard.svg?react";
import Document from "./files/document.svg?react";
import People from "./files/people.svg?react";
import Question from "./files/question.svg?react";
import SidebarClose from "./files/sidebar-close.svg?react";
import SidebarOpen from "./files/sidebar-open.svg?react";

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
  dashboard: Dashboard,
  document: Document,
  people: People,
  question: Question,
  "sidebar-close": SidebarClose,
  "sidebar-open": SidebarOpen,
};

export function AppIcon({ icon, size = 24, color = "black" }: Readonly<Props>) {
  const IconComponent = iconMap[icon];

  if (!IconComponent) {
    console.error(`Icon "${icon}" not found.`);
    return null;
  }

  return <IconComponent width={size} height={size} color={color} />;
}
