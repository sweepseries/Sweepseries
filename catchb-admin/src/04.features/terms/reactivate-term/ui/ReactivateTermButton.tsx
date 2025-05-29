import { useCallback } from "react";
import { useNavigate } from "react-router";

import { useReactivateTerm } from "@entities/terms";
import { useColors } from "@shared/lib/colors";
import { TextChip } from "@shared/ui/Chips";

interface Props {
  termId: number;
}

export function ReactivateTermButton({ termId }: Readonly<Props>) {
  const { mutate: reactivateTermRequest } = useReactivateTerm(termId);
  const { colors } = useColors();
  const navigate = useNavigate();

  const reactivateTerm = useCallback(() => {
    if (window.confirm("정말로 이 약관을 재활성화하시겠습니까?")) {
      reactivateTermRequest(undefined, {
        onSuccess: () => {
          window.alert("약관이 성공적으로 재활성화되었습니다.");
          navigate("/terms");
        },
        onError: () => {
          window.alert("약관 재활성화에 실패했습니다. 다시 시도해주세요.");
        },
      });
    }
  }, [reactivateTermRequest, navigate]);

  return (
    <button onClick={reactivateTerm} data-testid="reactivate-term-button">
      <TextChip
        label="재활성화"
        color={colors.onPrimary}
        backgroundColor={colors.success}
      />
    </button>
  );
}
