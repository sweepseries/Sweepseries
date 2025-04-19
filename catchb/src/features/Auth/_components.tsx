import styled, { DefaultTheme } from "styled-components/native";

export const AuthTextInput = styled.TextInput`
  width: 100%;
  height: 40px;
  padding: 8px 16px;
  border-radius: 4px;
  border: 1px solid
    ${({ theme }: { theme: DefaultTheme }) => theme.colors.border};
`;

export const AuthInputTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.mediumEmphasis};
`;
