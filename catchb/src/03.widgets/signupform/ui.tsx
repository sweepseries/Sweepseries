import { Keyboard } from "react-native";
import styled, { DefaultTheme } from "styled-components/native";

import { useColors } from "@shared/lib/colors";
import { TextButton } from "@shared/ui/Buttons";
import { CatchBMainLogo } from "@shared/ui/Logo";

interface Props {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  buttonText: string;
  buttonOnPress: () => void;
  buttonDisabled: boolean;
}

export function SignUpForm({
  title,
  subtitle,
  children,
  buttonText,
  buttonOnPress,
  buttonDisabled,
}: Readonly<Props>) {
  const { colors } = useColors();

  return (
    <Wrapper onPress={Keyboard.dismiss}>
      <Background>
        <CatchBMainLogo opacity={0.2} />
      </Background>
      <Contents>
        <Header>
          <Title>{title}</Title>
          {subtitle && <Subtitle>{subtitle}</Subtitle>}
        </Header>
        {children}
      </Contents>
      <TextButton
        text={buttonText}
        backgroundColor={colors.primary}
        onPress={buttonOnPress}
        fontSize={18}
        active={!buttonDisabled}
      />
    </Wrapper>
  );
}

const Wrapper = styled.Pressable`
  flex: 1;
  padding: 16px 16px 36px 16px;
  background-color: ${({ theme }: { theme: DefaultTheme }) =>
    theme.colors.background};
`;

const Background = styled.View`
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const Contents = styled.View`
  flex: 1;
  padding: 16px 0;
  gap: 16px;
`;

const Header = styled.View`
  gap: 8px;
`;

const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.highEmphasis};
`;

const Subtitle = styled.Text`
  font-size: 16px;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.lowEmphasis};
`;
