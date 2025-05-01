import { Text, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

import { useColors } from "@shared/lib/colors";
import { AppIcon } from "@shared/ui/Icons";

interface Props {
  title: string;
  checked: boolean;
  toggleChecked: () => void;
  pressRead?: () => void;
}

export function TermSimple({
  title,
  checked,
  toggleChecked,
  pressRead,
}: Readonly<Props>) {
  const { colors } = useColors();

  return (
    <Container>
      <CheckboxContent onPress={toggleChecked}>
        <AppIcon
          icon="check-circle"
          color={checked ? colors.primary : colors.lowEmphasis}
          size={24}
        />
        <Text>{title}</Text>
      </CheckboxContent>
      {pressRead && (
        <TouchableOpacity onPress={pressRead} testID={`right-${title}`}>
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
