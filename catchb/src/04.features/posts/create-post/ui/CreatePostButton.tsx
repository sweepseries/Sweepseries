import { router } from "expo-router";
import styled, { DefaultTheme } from "styled-components/native";

import { useColors } from "@shared/lib/colors";
import { AppIcon } from "@shared/ui/Icons";

export function CreatePostButton() {
  const { colors } = useColors();

  const goToCreatePostPage = () => {
    router.push("/community/posts/create");
  };

  return (
    <Button onPress={goToCreatePostPage} testID="create-post-button">
      <AppIcon icon="pencil" size={16} color={colors.background} />
      <ButtonText>글쓰기</ButtonText>
    </Button>
  );
}

const Button = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 8px 12px;
  gap: 4px;
  position: absolute;
  bottom: 16px;
  right: 16px;
  border-radius: 4px;
  background-color: ${({ theme }: { theme: DefaultTheme }) =>
    theme.colors.primary};
`;

const ButtonText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.background};
`;
