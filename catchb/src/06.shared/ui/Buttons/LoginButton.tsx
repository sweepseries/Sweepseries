import styled, { DefaultTheme } from "styled-components/native";

export const LoginButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 40px;
  border-radius: 4px;
`;

export const LoginButtonText = styled.Text`
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  line-height: 20px;
  include-font-padding: false;
  color: white;
`;

export const TroubleShootButton = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
`;

export const TroubleShootText = styled.Text`
  text-align: center;
  font-size: 14px;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.lowEmphasis};
`;
