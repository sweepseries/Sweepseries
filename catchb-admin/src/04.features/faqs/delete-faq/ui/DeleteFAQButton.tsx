import { useCallback } from "react";
import { useNavigate } from "react-router";

import { useDeleteFAQ } from "@entities/faqs";
import { useColors } from "@shared/lib/colors";
import { TextChip } from "@shared/ui/Chips";

interface Props {
  faqId: number;
}

export function DeleteFAQButton({ faqId }: Readonly<Props>) {
  const { mutate: deleteFAQRequest } = useDeleteFAQ(faqId);
  const { colors } = useColors();
  const navigate = useNavigate();

  const deleteFAQ = useCallback(() => {
    if (window.confirm("정말로 이 FAQ를 삭제하시겠습니까?")) {
      deleteFAQRequest(undefined, {
        onSuccess: () => {
          window.alert("FAQ가 성공적으로 삭제되었습니다.");
          navigate("/faqs");
        },
        onError: () => {
          window.alert("FAQ 삭제에 실패했습니다. 다시 시도해주세요.");
        },
      });
    }
  }, [deleteFAQRequest, navigate]);

  return (
    <button onClick={deleteFAQ} data-testid="delete-faq-button">
      <TextChip
        label="삭제"
        icon="trash"
        color={colors.onPrimary}
        backgroundColor={colors.error}
      />
    </button>
  );
}
