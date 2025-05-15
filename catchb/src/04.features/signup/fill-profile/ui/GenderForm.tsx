import styled from "styled-components/native";

import { useProfileForm } from "../provider/ProfileFormProvider";
import { AuthInputTitle } from "@shared/lib/signup";
import { ChipSelector } from "@shared/ui/Selectors";

export function GenderForm() {
  const { gender, setGender } = useProfileForm();

  return (
    <Wrapper>
      <AuthInputTitle>성별</AuthInputTitle>
      <ChipSelector
        options={["남성", "여성", "기타"]}
        selected={gender}
        onSelect={setGender}
      />
    </Wrapper>
  );
}

const Wrapper = styled.View`
  margin: 12px 0;
  gap: 12px;
`;
