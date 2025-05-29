import { useCallback } from "react";
import { useNavigate } from "react-router";

import { useDeleteTerm } from "@entities/terms";
import { useColors } from "@shared/lib/colors";
import { TextChip } from "@shared/ui/Chips";

interface Props {
  termId: number;
}

export function DeleteTermButton({ termId }: Readonly<Props>) {
  const { mutate: deleteTermRequest } = useDeleteTerm(termId);
  const { colors } = useColors();
  const navigate = useNavigate();

  const deleteTerm = useCallback(() => {
    if (window.confirm("정말로 이 약관을 삭제하시겠습니까?")) {
      deleteTermRequest(undefined, {
        onSuccess: () => {
          window.alert("약관이 성공적으로 삭제되었습니다.");
          navigate("/terms");
        },
        onError: () => {
          window.alert("약관 삭제에 실패했습니다. 다시 시도해주세요.");
        },
      });
    }
  }, [deleteTermRequest, navigate]);

  return (
    <button onClick={deleteTerm} data-testid="delete-term-button">
      <TextChip
        label="삭제"
        color={colors.onPrimary}
        backgroundColor={colors.error}
      />
    </button>
  );
}
