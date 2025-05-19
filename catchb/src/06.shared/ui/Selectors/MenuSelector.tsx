import { useState } from "react";
import { View } from "react-native";
import styled, { DefaultTheme } from "styled-components/native";

import { useColors } from "@shared/lib/colors";
import { Divider } from "@shared/ui/Dividers";
import { AppIcon } from "@shared/ui/Icons";

interface Props<T> {
  options: T[];
  selected: T;
  onSelect: (option: T) => void;
  renderLabel: (option: T) => string;
}

export function MenuSelector<T>({
  options,
  selected,
  onSelect,
  renderLabel,
}: Readonly<Props<T>>) {
  const [open, setOpen] = useState<boolean>(false);

  const { colors } = useColors();

  const toggleSelector = () => {
    setOpen((prev) => !prev);
  };

  const handleOptionSelect = (option: T) => {
    onSelect(option);
    setOpen(false);
  };

  return (
    <Container>
      <Selector onPress={toggleSelector} testID="selector">
        <Label>{renderLabel(selected)}</Label>
        <AppIcon icon="chevron-down" size={18} color={colors.mediumEmphasis} />
      </Selector>
      {open && (
        <OptionsContainer>
          {options.map((option, i) => (
            <View key={renderLabel(option)}>
              {i !== 0 && <Divider color={colors.border} />}
              <Option onPress={() => handleOptionSelect(option)} testID={renderLabel(option)}>
                <OptionText
                  style={{
                    color:
                      option === selected
                        ? colors.highEmphasis
                        : colors.mediumEmphasis,
                  }}
                >
                  {renderLabel(option)}
                </OptionText>
                {option === selected && (
                  <AppIcon icon="check" size={18} color={colors.primary} />
                )}
              </Option>
            </View>
          ))}
        </OptionsContainer>
      )}
    </Container>
  );
}

const Container = styled.View`
  position: relative;
`;

const Selector = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid
    ${({ theme }: { theme: DefaultTheme }) => theme.colors.border};
`;

const Label = styled.Text`
  font-size: 14px;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.highEmphasis};
`;

const OptionsContainer = styled.View`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  border-radius: 4px;
  border: 1px solid
    ${({ theme }: { theme: DefaultTheme }) => theme.colors.lowEmphasis};
  background-color: ${({ theme }: { theme: DefaultTheme }) =>
    theme.colors.background};
  z-index: 100;
`;

const Option = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
`;

const OptionText = styled.Text`
  font-size: 14px;
`;
