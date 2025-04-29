import { TouchableOpacity } from "react-native";

import { AppIcon } from "@shared/ui/Icons";

interface Props {
  onPress: () => void;
}

export function BackButton({ onPress }: Readonly<Props>) {
  return (
    <TouchableOpacity onPress={onPress}>
      <AppIcon icon="chevron-left" />
    </TouchableOpacity>
  );
}
