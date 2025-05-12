import { TouchableOpacity } from "react-native";
import { router } from "expo-router";

import { useColors } from "@shared/lib/colors";
import { AppIcon } from "@shared/ui/Icons";

export function HeaderLeftCloseButton() {
  const { colors } = useColors();

  const goBack = () => {
    router.back();
  };

  return (
    <TouchableOpacity onPress={goBack}>
      <AppIcon icon="close" color={colors.mediumEmphasis} />
    </TouchableOpacity>
  );
}
