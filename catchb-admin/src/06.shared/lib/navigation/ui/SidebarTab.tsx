import styled from "styled-components";

import { useColors } from "@shared/lib/colors";
import { type TabType } from "@shared/lib/navigation";
import { SidebarButton } from "@shared/ui/Buttons";
import { AppIcon } from "@shared/ui/Icons";

interface Props {
  tab: TabType;
  isSelected: boolean;
  isSidebarOpen: boolean;
  onClick: () => void;
}

export function SidebarTab({
  tab,
  isSelected,
  isSidebarOpen,
  onClick,
}: Readonly<Props>) {
  const { colors } = useColors();

  return (
    <Tab
      onClick={onClick}
      style={{
        justifyContent: isSidebarOpen ? "flex-start" : "center",
        padding: isSelected && isSidebarOpen ? "12px 16px" : "12px 4px",
        backgroundColor: isSelected ? colors.foreground500 : "transparent",
      }}
    >
      <AppIcon icon={tab.icon} color={colors.background500} size={20} />
      {isSidebarOpen && <span>{tab.title}</span>}
    </Tab>
  );
}

const Tab = styled(SidebarButton)`
  gap: 8px;
  color: ${({ theme }) => theme.colors.background500};
  transition: background-color 0.3s ease-in-out;

  &:hover {
    padding: 12px 16px;
    background-color: ${({ theme }) => theme.colors.foreground500};
    transition: padding 0.3s ease-in-out;
  }
`;
