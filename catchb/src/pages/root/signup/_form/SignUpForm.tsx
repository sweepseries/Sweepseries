import { Keyboard } from "react-native";
import styled, { DefaultTheme } from "styled-components/native";

import { TextButton } from "@components/Buttons";
import { useTheme } from "@contexts/theme";
import { CatchBLogo } from "@features/CatchB";

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
  const { theme } = useTheme();

  return (
    <Wrapper onPress={Keyboard.dismiss}>
      <Background>
        <CatchBLogo opacity={0.2} />
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
        backgroundColor={theme.primary}
        onPress={buttonOnPress}
        fontSize={18}
        active={!buttonDisabled}
      />
    </Wrapper>
  );
}

const Wrapper = styled.Pressable`
  flex: 1;
  padding: 16px 8px;
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
  padding: 0 16px;
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
