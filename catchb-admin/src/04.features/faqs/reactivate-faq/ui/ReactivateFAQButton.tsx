import { useCallback } from "react";
import { useNavigate } from "react-router";

import { useReactivateFAQ } from "@entities/faqs";
import { useColors } from "@shared/lib/colors";
import { TextChip } from "@shared/ui/Chips";

interface Props {
  faqId: number;
}

export function ReactivateFAQButton({ faqId }: Readonly<Props>) {
  const { mutate: reactivateFAQRequest } = useReactivateFAQ(faqId);
  const { colors } = useColors();
  const navigate = useNavigate();

  const reactivateFAQ = useCallback(() => {
    if (window.confirm("정말로 이 FAQ를 다시 활성화하시겠습니까?")) {
      reactivateFAQRequest(undefined, {
        onSuccess: () => {
          window.alert("FAQ가 성공적으로 재활성화되었습니다.");
          navigate("/faqs");
        },
        onError: () => {
          window.alert("FAQ 재활성화에 실패했습니다. 다시 시도해주세요.");
        },
      });
    }
  }, [reactivateFAQRequest, navigate]);

  return (
    <button onClick={reactivateFAQ} data-testid="reactivate-faq-button">
      <TextChip
        label="되살리기"
        icon="undo"
        color={colors.onPrimary}
        backgroundColor={colors.primary}
      />
    </button>
  );
}
