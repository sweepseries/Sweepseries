import type { InquiryCategoryType } from "../models/types";
import { useColors } from "@shared/lib/colors";
import { TextChip } from "@shared/ui/Chips";

interface Props {
  category: InquiryCategoryType;
  isActive?: boolean;
}

export function InquiryCategoryChip({
  category,
  isActive = false,
}: Readonly<Props>) {
  const { colors } = useColors();

  return (
    <TextChip
      label={category.name}
      color={isActive ? category.color : colors.gray900}
    />
  );
}
