import styled, { DefaultTheme } from "styled-components/native";

/**
 * 로그인 / 회원가입 화면에서 사용하는 텍스트 입력 컴포넌트.
 */

export const AuthTextInput = styled.TextInput`
  height: 40px;
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid
    ${({ theme }: { theme: DefaultTheme }) => theme.colors.border};
`;
