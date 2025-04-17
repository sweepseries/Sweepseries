import { TouchableOpacity } from "react-native";

import { AppIcon } from "@components/Icons";
import { useTheme } from "@contexts/theme";

interface Props {
  onPress: () => void;
}

export function BackButton({ onPress }: Readonly<Props>) {
  const { theme } = useTheme();

  return (
    <TouchableOpacity onPress={onPress}>
      <AppIcon icon="chevron-left" size={20} color={theme.highEmphasis} />
    </TouchableOpacity>
  );
}
