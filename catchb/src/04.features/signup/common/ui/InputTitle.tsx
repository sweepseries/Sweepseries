import styled, { DefaultTheme } from "styled-components/native";

export const AuthInputTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.mediumEmphasis};
`;
