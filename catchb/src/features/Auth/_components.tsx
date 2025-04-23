import styled, { DefaultTheme } from "styled-components/native";

export const AuthTextInput = styled.TextInput`
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

interface PhoneNumberInputProps {
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
}: Readonly<PhoneNumberInputProps>) {
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
        maxLength={4}
      />
      <Hyphen>-</Hyphen>
      <AuthTextInput
        value={lastNumber}
        onChangeText={setLastNumber}
        keyboardType="phone-pad"
        returnKeyType="done"
        style={{ flex: 1 }}
        maxLength={4}
      />
    </Wrapper>
  );
}

interface BirthdateInputProps {
  year: string;
  month: string;
  day: string;
  setYear: (value: string) => void;
  setMonth: (value: string) => void;
  setDay: (value: string) => void;
}

export function BirthdateInputs({
  year,
  month,
  day,
  setYear,
  setMonth,
  setDay,
}: Readonly<BirthdateInputProps>) {
  return (
    <Wrapper>
      <BirthDateInput
        value={year}
        onChangeText={setYear}
        keyboardType="phone-pad"
        returnKeyType="next"
        placeholder="YYYY"
        maxLength={4}
      />
      <Hyphen>-</Hyphen>
      <BirthDateInput
        value={month}
        onChangeText={setMonth}
        keyboardType="phone-pad"
        returnKeyType="next"
        placeholder="MM"
        maxLength={2}
      />
      <Hyphen>-</Hyphen>
      <BirthDateInput
        value={day}
        onChangeText={setDay}
        keyboardType="phone-pad"
        returnKeyType="done"
        placeholder="DD"
        maxLength={2}
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
  padding: 8px 0;
  text-align: center;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.lowEmphasis};
  background-color: ${({ theme }: { theme: DefaultTheme }) =>
    theme.colors.backgroundGray};
`;

const Hyphen = styled.Text`
  font-size: 16px;
  line-height: 30px;
  font-weight: bold;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.lowEmphasis};
`;

const BirthDateInput = styled(AuthTextInput)`
  flex: 1;
  text-align: center;
  max-width: 20%;
  height: 32px;
`;
