import { Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import styled from "styled-components/native";

import { TermsAndConditionsType } from "../models/types";
import { useColors } from "@shared/lib/colors";
import { AppIcon } from "@shared/ui/Icons";

interface CheckAllTermsProps {
  checked: boolean;
  toggle: () => void;
}

export function CheckAllTerms({
  checked,
  toggle,
}: Readonly<CheckAllTermsProps>) {
  const { colors } = useColors();

  return (
    <Container>
      <CheckboxContent onPress={toggle} testID="toggle-all">
        <AppIcon
          icon="check-circle"
          color={checked ? colors.primary : colors.lowEmphasis}
          size={24}
        />
        <Text>모두 동의 합니다.</Text>
      </CheckboxContent>
    </Container>
  );
}

interface Props {
  term: TermsAndConditionsType;
  isChecked: boolean;
  toggleCheck: () => void;
}

export function TermSimple({ term, isChecked, toggleCheck }: Readonly<Props>) {
  const { colors } = useColors();

  const goToDetailPage = () => {
    router.push(`/signup/terms/${term.id}`);
  };

  return (
    <Container testID={isChecked && `term-${term.id}-checked`}>
      <CheckboxContent onPress={toggleCheck} testID={`term-${term.id}`}>
        <AppIcon
          icon="check-circle"
          color={isChecked ? colors.primary : colors.lowEmphasis}
          size={24}
        />
        <Text>{`(${term.is_required ? "필수" : "선택"}) ${term.title}`}</Text>
      </CheckboxContent>
      {Boolean(term.content) && (
        <TouchableOpacity onPress={goToDetailPage} testID={`right-${term.id}`}>
          <AppIcon icon="chevron-right" color={colors.lowEmphasis} size={16} />
        </TouchableOpacity>
      )}
    </Container>
  );
}

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const CheckboxContent = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;
