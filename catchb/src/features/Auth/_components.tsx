import styled, { DefaultTheme } from "styled-components/native";

export const AuthTextInput = styled.TextInput`
  width: 100%;
  height: 40px;
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid
    ${({ theme }: { theme: DefaultTheme }) => theme.colors.border};
`;

export const AuthInputTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.mediumEmphasis};
`;

interface Props {
  middleNumber: string;
  lastNumber: string;
  setMiddleNumber: (value: string) => void;
  setLastNumber: (value: string) => void;
}

export function PhoneNumberInputs({
  middleNumber,
  lastNumber,
  setMiddleNumber,
  setLastNumber,
}: Readonly<Props>) {
  return (
    <Wrapper>
      <DisabledInput
        value="010"
        keyboardType="phone-pad"
        returnKeyType="next"
        editable={false}
      />
      <Hyphen>-</Hyphen>
      <AuthTextInput
        value={middleNumber}
        onChangeText={setMiddleNumber}
        keyboardType="phone-pad"
        returnKeyType="next"
        style={{ flex: 1 }}
      />
      <Hyphen>-</Hyphen>
      <AuthTextInput
        value={lastNumber}
        onChangeText={setLastNumber}
        keyboardType="phone-pad"
        returnKeyType="done"
        style={{ flex: 1 }}
      />
    </Wrapper>
  );
}

const Wrapper = styled.View`
  flex-direction: row;
  gap: 8px;
`;

const DisabledInput = styled(AuthTextInput)`
  flex: 1;
  height: 40px;
  padding: 8px 0;
  text-align: center;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.lowEmphasis};
  background-color: ${({ theme }: { theme: DefaultTheme }) =>
    theme.colors.backgroundGray};
`;

const Hyphen = styled.Text`
  height: 40px;
  font-size: 16px;
  line-height: 36px;
  font-weight: bold;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.lowEmphasis};
`;
