import styled from "styled-components/native";

import { AuthInputTitle } from "./InputTitle";
import { AuthTextInput } from "@shared/ui/TextInput";

interface Props {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  title?: string;
  secureTextEntry?: boolean;
  errorMessage?: string;
  type?: "default" | "email-address" | "phone-pad" | "number-pad";
  returnKeyType?: "next" | "done";
}

export function InputField({
  title,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  errorMessage,
  type = "default",
  returnKeyType = "done",
}: Props) {
  return (
    <Wrapper>
      {title && <AuthInputTitle>{title}</AuthInputTitle>}
      <AuthTextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        type={type}
        returnKeyType={returnKeyType}
        testID={title}
      />
      {errorMessage ? <ErrorText>{errorMessage}</ErrorText> : null}
    </Wrapper>
  );
}

const Wrapper = styled.View`
  margin: 8px 0;
  gap: 12px;
`;

const ErrorText = styled.Text`
  color: rgba(255, 0, 0, 0.8);
  font-size: 14px;
  text-align: left;
`;
