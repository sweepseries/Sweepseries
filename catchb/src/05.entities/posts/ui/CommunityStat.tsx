import styled, { DefaultTheme } from "styled-components/native";

import { useColors } from "@shared/lib/colors";
import { AppIcon } from "@shared/ui/Icons";

interface Props {
  icon: string;
  value: number;
  color?: string;
}

/**
 * 게시글 조회수, 좋아요 수, 댓글 수 등을 표시하는 컴포넌트.
 */

export function CommunityStat({ icon, value, color }: Readonly<Props>) {
  const { colors } = useColors();

  return (
    <StatsWrapper>
      <AppIcon icon={icon} size={16} color={color ?? colors.lowEmphasis} />
      <ValueText>{value}</ValueText>
    </StatsWrapper>
  );
}

const StatsWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 4px;
`;

const ValueText = styled.Text`
  font-size: 14px;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.lowEmphasis};
`;
