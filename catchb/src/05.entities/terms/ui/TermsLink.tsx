import styled, { DefaultTheme } from "styled-components/native";

interface Props {
  text: string;
  onPress: () => void;
}

export function TermsLink({ text, onPress }: Readonly<Props>) {
  return (
    <Container onPress={onPress} testID="terms-link">
      <Text>{text}</Text>
    </Container>
  );
}

const Container = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Text = styled.Text`
  font-size: 12px;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.lowEmphasis};
`;
