import styled, { DefaultTheme } from "styled-components/native";

import { useColors } from "@shared/lib/colors";
import { AppIcon } from "@shared/ui/Icons";

/**
 * 기본 검색바 컴포넌트.
 * 오른쪽에 돋보기 아이콘이 있는 검색 입력창.
 */

interface Props {
  placeholder: string;
  value: string;
  onChange: (text: string) => void;
}

export function Searchbar({ placeholder, value, onChange }: Readonly<Props>) {
  const { colors } = useColors();

  return (
    <Container>
      <Input
        placeholder={placeholder}
        placeholderTextColor={colors.lowEmphasis}
        placeholderTextSize={4}
        value={value}
        onChangeText={onChange}
        enterKeyHint="search"
      />
      <AppIcon icon="search" size={14} color={colors.primary} />
    </Container>
  );
}

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  gap: 8px;
  border: 1px solid
    ${({ theme }: { theme: DefaultTheme }) => theme.colors.border};
  border-radius: 4px;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.05);
`;

const Input = styled.TextInput`
  flex: 1;
  font-size: 14px;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.highEmphasis};
`;
