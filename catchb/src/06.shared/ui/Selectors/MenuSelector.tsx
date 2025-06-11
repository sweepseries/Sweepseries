import { ReactNode, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import styled, { DefaultTheme } from "styled-components/native";

import { useColors } from "@shared/lib/colors";
import { Divider } from "@shared/ui/Dividers";
import { AppIcon } from "@shared/ui/Icons";

interface Props<T> {
  options: T[];
  selected: T;
  onSelect: (option: T) => void;
  keyExtractor: (option: T) => string;
  children: ReactNode; // 기본적으로 렌더링할 컴포넌트 (메뉴를 open하는 버튼)
}

export function MenuSelector<T>({
  options,
  selected,
  onSelect,
  keyExtractor,
  children,
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
      <TouchableOpacity onPress={toggleSelector} testID="selector">
        {children}
      </TouchableOpacity>
      {open && (
        <OptionsContainer>
          {options.map((option, i) => (
            <View key={keyExtractor(option)}>
              {i !== 0 && <Divider color={colors.border} />}
              <Option
                onPress={() => handleOptionSelect(option)}
                testID={keyExtractor(option)}
              >
                <OptionText
                  style={{
                    color:
                      option === selected
                        ? colors.highEmphasis
                        : colors.mediumEmphasis,
                  }}
                >
                  {keyExtractor(option)}
                </OptionText>
                {option === selected && (
                  <AppIcon icon="check" size={16} color={colors.primary} />
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
  padding: 8px 8px 8px 12px;
  gap: 4px;
`;

const OptionText = styled.Text`
  font-size: 14px;
`;
