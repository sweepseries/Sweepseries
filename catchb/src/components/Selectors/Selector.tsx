import styled, { DefaultTheme } from "styled-components/native";

import { useTheme } from "@contexts/theme";

interface Props {
  options: string[];
  selected: string;
  onSelect: (option: string) => void;
}

export function Selector({ options, selected, onSelect }: Readonly<Props>) {
  const { theme } = useTheme();
  
  return (
    <Options>
      {options.map((option) => (
        <OptionChip
          key={option}
          onPress={() => onSelect(option)}
          style={
            selected === option && {
              backgroundColor: theme.primary,
              borderColor: "transparent",
            }
          }
          testID={option}
        >
          <OptionText
            style={
              selected === option && {
                color: theme.background,
              }
            }
          >
            {option}
          </OptionText>
        </OptionChip>
      ))}
    </Options>
  );
}

const Options = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

const OptionChip = styled.TouchableOpacity`
  padding: 6px 12px;
  border: 1px solid
    ${({ theme }: { theme: DefaultTheme }) => theme.colors.border};
  border-radius: 4px;
`;

const OptionText = styled.Text`
  font-size: 14px;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.lowEmphasis};
`;
