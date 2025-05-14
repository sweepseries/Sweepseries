import styled from "styled-components/native";

import { AppIcon } from "@shared/ui/Icons";

interface Props {
  icon: string;
  text: string;
  onPress: () => void;
  color?: string;
}

export function NavigateButton({
  icon,
  text,
  onPress,
  color = "black",
}: Readonly<Props>) {
  return (
    <Container onPress={onPress} testID={`${text}-button`}>
      <AppIcon icon={icon} size={18} color={color} />
      <Text style={{ color }}>{text}</Text>
    </Container>
  );
}

const Container = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 6px 0;
  gap: 8px;
  border-radius: 4px;
`;

const Text = styled.Text`
  font-size: 16px;
`;
