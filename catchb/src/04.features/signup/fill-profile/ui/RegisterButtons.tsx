import styled from "styled-components/native";

import { useProfileForm } from "../providers/ProfileFormProvider";
import { useColors } from "@shared/lib/colors";
import { TextButton } from "@shared/ui/Buttons";

export function RegisterButtons() {
  const { colors } = useColors();
  const { submit } = useProfileForm();

  return (
    <Container>
      <SubmitButton>
        <TextButton
          text="시작하기"
          onPress={() => submit("submit")}
          backgroundColor={colors.primary}
        />
      </SubmitButton>
      <SkipButton>
        <TextButton
          text="다음에"
          onPress={() => submit("skip")}
          backgroundColor={colors.background}
          color={colors.lowEmphasis}
        />
      </SkipButton>
    </Container>
  );
}

const Container = styled.View`
  flex-direction: row;
  gap: 8px;
`;

const SubmitButton = styled.View`
  flex: 3;
`;

const SkipButton = styled.View`
  flex: 1;
`;
