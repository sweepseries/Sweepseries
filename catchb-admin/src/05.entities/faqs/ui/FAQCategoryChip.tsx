import type { FAQCategoryType } from "../models/types";
import { useColors } from "@shared/lib/colors";
import { TextChip } from "@shared/ui/Chips";

interface Props {
  category: FAQCategoryType;
  isActive?: boolean;
}

export function FAQCategoryChip({
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
