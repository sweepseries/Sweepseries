import styled from "styled-components";

import { AppIcon } from "@shared/ui/Icons";

interface Props {
  label: string;
  icon?: string;
  color?: string;
  backgroundColor?: string;
}

export function TextChip({
  label,
  icon,
  color = "gray",
  backgroundColor,
}: Readonly<Props>) {
  return (
    <ChipWrapper
      style={{ color: color, backgroundColor: backgroundColor ?? `${color}20` }}
    >
      {icon && <AppIcon icon={icon} size={14} color={color} />}
      {label}
    </ChipWrapper>
  );
}
const ChipWrapper = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  padding: 4px 8px;
  gap: 4px;

  font-size: 0.925rem;
  font-weight: 500;

  border-radius: 4px;

  white-space: nowrap;
`;
