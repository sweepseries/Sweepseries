import styled, { DefaultTheme } from "styled-components/native";

import { AuthTextInput } from "@shared/ui/TextInput";

interface Props {
  title: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  errorMessage?: string;
  type?: "default" | "email-address" | "phone-pad";
  returnKeyType?: "next" | "done";
}

export function InputField({
  title,
  value,
  onChangeText,
  placeholder,
  errorMessage,
  type = "default",
  returnKeyType = "done",
}: Props) {
  return (
    <Wrapper>
      <AuthInputTitle>{title}</AuthInputTitle>
      <AuthTextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        type={type}
        returnKeyType={returnKeyType}
      />
      {errorMessage ? <ErrorText>{errorMessage}</ErrorText> : null}
    </Wrapper>
  );
}

const Wrapper = styled.View`
  margin: 8px 0;
  gap: 12px;
`;

const AuthInputTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.mediumEmphasis};
`;

const ErrorText = styled.Text`
  color: rgba(255, 0, 0, 0.8);
  font-size: 14px;
  text-align: left;
`;
