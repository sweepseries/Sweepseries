import type { InquiryStatusType } from "../models/types";
import { useColors } from "@shared/lib/colors";
import { TextChip } from "@shared/ui/Chips";

interface Props {
  status: InquiryStatusType;
  isActive?: boolean;
}

export function InquiryStatusChip({
  status,
  isActive = false,
}: Readonly<Props>) {
  const { colors } = useColors();

  return (
    <TextChip
      label={status.name}
      color={isActive ? status.color : colors.gray900}
    />
  );
}
