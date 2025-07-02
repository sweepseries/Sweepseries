import { ReactNode } from "react";
import { View } from "react-native";
import styled, { DefaultTheme } from "styled-components/native";

import { usePostDetails } from "../contexts/usePostDetails";
import { MenuItemType } from "../models/types";
import { useColors } from "@shared/lib/colors";
import { Divider } from "@shared/ui/Dividers";

interface Props {
  items: MenuItemType[];
  children: ReactNode; // 기본적으로 렌더링할 컴포넌트 (메뉴를 open하는 버튼)
}

export function Menu({ items, children }: Readonly<Props>) {
  const { isMenuOpen } = usePostDetails();
  const { colors } = useColors();

  return (
    <Container>
      {children}
      {isMenuOpen && (
        <OptionsContainer>
          {items.map((item, i) => (
            <View key={item.key}>
              {i !== 0 && <Divider color={colors.border} />}
              {item.component}
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
