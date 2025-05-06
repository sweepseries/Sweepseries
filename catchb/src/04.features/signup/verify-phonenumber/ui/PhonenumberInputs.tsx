import styled, { DefaultTheme } from "styled-components/native";

import { AuthTextInput } from "@shared/ui/TextInput";

interface PhoneNumberInputProps {
  middleNumber: string;
  lastNumber: string;
  setMiddleNumber: (value: string) => void;
  setLastNumber: (value: string) => void;
  disabled?: boolean;
}

export function PhoneNumberInputs({
  middleNumber,
  lastNumber,
  setMiddleNumber,
  setLastNumber,
  disabled = false,
}: Readonly<PhoneNumberInputProps>) {
  return (
    <Wrapper>
      <DisabledInput value="010" editable={false} />
      <Hyphen>-</Hyphen>
      {disabled ? (
        <DisabledInput
          value={middleNumber}
          editable={false}
          style={{ flex: 1 }}
          testID="middle-number"
        />
      ) : (
        <AuthTextInput
          value={middleNumber}
          onChangeText={setMiddleNumber}
          keyboardType="phone-pad"
          returnKeyType="next"
          style={{ flex: 1 }}
          maxLength={4}
          testID="middle-number"
        />
      )}
      <Hyphen>-</Hyphen>
      {disabled ? (
        <DisabledInput
          value={lastNumber}
          editable={false}
          style={{ flex: 1 }}
          testID="last-number"
        />
      ) : (
        <AuthTextInput
          value={lastNumber}
          onChangeText={setLastNumber}
          keyboardType="phone-pad"
          returnKeyType="done"
          style={{ flex: 1 }}
          maxLength={4}
          testID="last-number"
        />
      )}
    </Wrapper>
  );
}

const Wrapper = styled.View`
  flex-direction: row;
  gap: 8px;
`;

const DisabledInput = styled(AuthTextInput)`
  flex: 1;
  padding: 8px 0;
  text-align: center;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.lowEmphasis};
  background-color: ${({ theme }: { theme: DefaultTheme }) =>
    theme.colors.backgroundGray};
`;

const Hyphen = styled.Text`
  font-size: 16px;
  font-weight: bold;
  line-height: 40px;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.lowEmphasis};
`;
