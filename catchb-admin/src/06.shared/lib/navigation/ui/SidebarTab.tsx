import styled from "styled-components";

import { useColors } from "@shared/lib/colors";
import { SidebarButton } from "@shared/ui/Buttons";

interface Props {
  title: string;
  isSelected: boolean;
  onClick: () => void;
}

export function SidebarTab({ title, isSelected, onClick }: Readonly<Props>) {
  const { colors } = useColors();

  return (
    <Tab
      onClick={onClick}
      style={
        isSelected
          ? { padding: "12px 16px", backgroundColor: colors.foreground500 }
          : { padding: "12px 4px", backgroundColor: "transparent" }
      }
    >
      {title}
    </Tab>
  );
}

const Tab = styled(SidebarButton)`
  justify-content: flex-start;
  color: ${({ theme }) => theme.colors.background500};
  transition: background-color 0.3s ease-in-out;

  &:hover {
    padding: 12px 16px;
    background-color: ${({ theme }) => theme.colors.foreground500};
    transition: padding 0.2s ease-in-out;
  }
`;
