import styled, { DefaultTheme } from "styled-components/native";

export const AuthTextInput = styled.TextInput`
  height: 40px;
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid
    ${({ theme }: { theme: DefaultTheme }) => theme.colors.border};
`;
