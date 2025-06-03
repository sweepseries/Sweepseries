import { useNavigate } from "react-router";

import { useColors } from "@shared/lib/colors";
import { TextChip } from "@shared/ui/Chips";

interface Props {
  faqId: number;
}

export function NavigateToEditPageButton({ faqId }: Readonly<Props>) {
  const { colors } = useColors();
  const navigate = useNavigate();

  const toggleEditMode = () => {
    navigate(`/faqs/${faqId}/edit`);
  };

  return (
    <button onClick={toggleEditMode} data-testid="edit-faq-button">
      <TextChip
        label="수정"
        icon="pencil"
        color={colors.onPrimary}
        backgroundColor={colors.primary}
      />
    </button>
  );
}
