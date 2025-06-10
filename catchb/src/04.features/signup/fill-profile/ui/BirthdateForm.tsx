import styled from "styled-components/native";

import { useProfileForm } from "../providers/ProfileFormProvider";
import { BirthdateInputs } from "./_birthdateinputs";
import { AuthInputTitle } from "@shared/lib/signup";

export function BirthdateForm() {
  const {
    birthYear,
    birthMonth,
    birthDate,
    setBirthYear,
    setBirthMonth,
    setBirthDate,
  } = useProfileForm();

  return (
    <Wrapper>
      <AuthInputTitle>생년월일</AuthInputTitle>
      <BirthdateInputs
        year={birthYear}
        month={birthMonth}
        day={birthDate}
        setYear={setBirthYear}
        setMonth={setBirthMonth}
        setDay={setBirthDate}
      />
    </Wrapper>
  );
}

const Wrapper = styled.View`
  margin: 12px 0;
  gap: 12px;
`;
