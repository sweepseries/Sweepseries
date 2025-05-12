import { Text, TouchableOpacity } from "react-native";

import { withdrawReasonStyles } from "./styles";
import { WithdrawReasonType } from "../models/types";
import { useColors } from "@shared/lib/colors";
import { AppIcon } from "@shared/ui/Icons";

interface Props {
  reason: WithdrawReasonType;
  onPress: (reason: WithdrawReasonType) => void;
  isSelected: boolean;
}

export function WithdrawReasonToggle({
  reason,
  onPress,
  isSelected,
}: Readonly<Props>) {
  const { colors } = useColors();
  const styles = withdrawReasonStyles(colors);

  return (
    <TouchableOpacity
      onPress={() => onPress(reason)}
      style={styles.reasonButton}
    >
      <AppIcon
        icon="check-circle"
        size={24}
        color={isSelected ? colors.primary : colors.border}
      />
      <Text style={styles.reasonText}>{reason.reason}</Text>
    </TouchableOpacity>
  );
}
