import styled, { DefaultTheme } from "styled-components/native";

import { useColors } from "@shared/lib/colors";
import { AppIcon } from "@shared/ui/Icons";

interface ErrorGuideProps {
  message: string;
}

export function ErrorGuide({ message }: Readonly<ErrorGuideProps>) {
  const { colors } = useColors();

  return (
    <Container>
      <AppIcon icon="error" size={42} color={colors.lowEmphasis} />
      <Message>{message}</Message>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  gap: 12px;
`;

const Message = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.lowEmphasis};
`;
