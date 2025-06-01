import { useCallback } from "react";
import { useNavigate } from "react-router";

import { useReactivateAnnouncement } from "@entities/announcements";
import { useColors } from "@shared/lib/colors";
import { TextChip } from "@shared/ui/Chips";

interface Props {
  announcementId: number;
}

export function ReactivateAnnouncementButton({
  announcementId,
}: Readonly<Props>) {
  const { mutate: reactivateAnnouncementRequest } =
    useReactivateAnnouncement(announcementId);
  const { colors } = useColors();
  const navigate = useNavigate();

  const reactivateAnnouncement = useCallback(() => {
    if (window.confirm("정말로 이 공지를 다시 활성화하시겠습니까?")) {
      reactivateAnnouncementRequest(undefined, {
        onSuccess: () => {
          window.alert("공지사항이 성공적으로 재활성화되었습니다.");
          navigate("/announcements");
        },
        onError: () => {
          window.alert("공지사항 재활성화에 실패했습니다. 다시 시도해주세요.");
        },
      });
    }
  }, [reactivateAnnouncementRequest, navigate]);

  return (
    <button
      onClick={reactivateAnnouncement}
      data-testid="reactivate-announcement-button"
    >
      <TextChip
        label="되살리기"
        icon="undo"
        color={colors.onPrimary}
        backgroundColor={colors.primary}
      />
    </button>
  );
}
