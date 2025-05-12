import { useWithdrawSheet } from "../provider/WithdrawSheetProvider";
import { useColors } from "@shared/lib/colors";
import { NavigateButton } from "@shared/ui/Buttons";

export function DeleteAccountButton() {
  const { colors } = useColors();
  const { openSheet } = useWithdrawSheet();

  return (
    <NavigateButton
      icon="person-minus"
      text="회원탈퇴"
      onPress={openSheet}
      color={colors.lowEmphasis}
    />
  );
}
