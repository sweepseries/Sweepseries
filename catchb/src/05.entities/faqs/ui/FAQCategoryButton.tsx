import { Dimensions } from "react-native";
import styled, { DefaultTheme } from "styled-components/native";

import { useColors } from "@shared/lib/colors";

interface Props {
  category: string;
  isSelected: boolean;
  onPress: () => void;
}

export function FAQCategoryButton({
  category,
  isSelected,
  onPress,
}: Readonly<Props>) {
  const { colors } = useColors();

  const buttonWidth = (Dimensions.get("window").width - 90) / 3;

  return (
    <Container
      isSelected={isSelected}
      onPress={onPress}
      style={{
        width: buttonWidth,
        backgroundColor: isSelected ? colors.primary : colors.background,
      }}
    >
      <CategoryText
        style={{ color: isSelected ? colors.background : colors.highEmphasis }}
      >
        {category}
      </CategoryText>
    </Container>
  );
}

const Container = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  margin: 4px 8px;
  padding: 8px 16px;
  border: 1px solid
    ${({ theme }: { theme: DefaultTheme }) => theme.colors.border};
`;

const CategoryText = styled.Text`
  text-align: center;
  font-size: 16px;
  font-weight: 500;
`;
