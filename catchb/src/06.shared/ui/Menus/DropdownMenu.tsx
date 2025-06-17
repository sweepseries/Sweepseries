import { ReactNode, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import styled, { DefaultTheme } from "styled-components/native";

import { useColors } from "@shared/lib/colors";
import { Divider } from "@shared/ui/Dividers";

export interface MenuOptionType {
  label: string;
  onPress: () => void;
}

interface Props {
  options: MenuOptionType[];
  children: ReactNode; // 기본적으로 렌더링할 컴포넌트 (메뉴를 open하는 버튼)
}

export function DropdownMenu({ options, children }: Readonly<Props>) {
  const [open, setOpen] = useState<boolean>(false);

  const { colors } = useColors();

  const toggleSelector = () => {
    setOpen((prev) => !prev);
  };

  return (
    <Container>
      <TouchableOpacity onPress={toggleSelector} testID="menu">
        {children}
      </TouchableOpacity>
      {open && (
        <OptionsContainer>
          {options.map((option, i) => (
            <View key={option.label}>
              {i !== 0 && <Divider color={colors.border} />}
              <TouchableOpacity
                onPress={() => {
                  option.onPress();
                  setOpen(false);
                }}
                testID={option.label}
              >
                <OptionText>{option.label}</OptionText>
              </TouchableOpacity>
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
  flex: 1;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 70%;
  right: 0;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: ${({ theme }: { theme: DefaultTheme }) =>
    theme.colors.background};
  z-index: 100;
`;

const OptionText = styled.Text`
  width: 100%;
  padding: 8px 12px;
  font-size: 14px;
`;
