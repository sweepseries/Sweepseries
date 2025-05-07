import styled, { DefaultTheme } from "styled-components/native";

import { AuthTextInput } from "@shared/ui/TextInput";

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
        testID="year"
      />
      <Hyphen>-</Hyphen>
      <BirthDateInput
        value={month}
        onChangeText={setMonth}
        keyboardType="phone-pad"
        returnKeyType="next"
        placeholder="MM"
        maxLength={2}
        testID="month"
      />
      <Hyphen>-</Hyphen>
      <BirthDateInput
        value={day}
        onChangeText={setDay}
        keyboardType="phone-pad"
        returnKeyType="done"
        placeholder="DD"
        maxLength={2}
        testID="day"
      />
    </Wrapper>
  );
}

const Wrapper = styled.View`
  flex-direction: row;
  gap: 8px;
`;

const BirthDateInput = styled(AuthTextInput)`
  flex: 1;
  text-align: center;
  max-width: 20%;
  height: 32px;
`;

const Hyphen = styled.Text`
  font-size: 16px;
  font-weight: bold;
  line-height: 40px;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.lowEmphasis};
`;
