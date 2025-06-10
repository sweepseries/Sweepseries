import { TouchableOpacity } from "react-native";
import { router } from "expo-router";

import { useColors } from "@shared/lib/colors";
import { AppIcon } from "@shared/ui/Icons";

export function HeaderLeftBackButton() {
  const { colors } = useColors();

  const goBack = () => {
    router.back();
  };

  return (
    <TouchableOpacity onPress={goBack} testID="header-back-button">
      <AppIcon icon="chevron-left" color={colors.mediumEmphasis} />
    </TouchableOpacity>
  );
}
