import styled, { DefaultTheme } from "styled-components/native";

import { useColors } from "@shared/lib/colors";

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
        value={value}
        onChangeText={onChange}
        enterKeyHint="search"
      />
    </Container>
  );
}

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  border: 1px solid
    ${({ theme }: { theme: DefaultTheme }) => theme.colors.border};
  border-radius: 8px;
`;

const Input = styled.TextInput`
  flex: 1;
  font-size: 16px;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.highEmphasis};
`;
