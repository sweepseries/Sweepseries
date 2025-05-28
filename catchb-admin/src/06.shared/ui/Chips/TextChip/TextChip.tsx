import styled from "styled-components";

interface Props {
  label: string;
  color?: string;
  backgroundColor?: string;
}

export function TextChip({
  label,
  color = "gray",
  backgroundColor,
}: Readonly<Props>) {
  return (
    <ChipWrapper
      style={{ color: color, backgroundColor: backgroundColor ?? `${color}20` }}
    >
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

  font-size: 0.9rem;
  font-weight: 500;

  border-radius: 4px;

  white-space: nowrap;
`;
