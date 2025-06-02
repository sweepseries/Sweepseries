import { useCallback } from "react";
import { useNavigate } from "react-router";

import { useDeleteAnnouncement } from "@entities/announcements";
import { useColors } from "@shared/lib/colors";
import { TextChip } from "@shared/ui/Chips";

interface Props {
  announcementId: number;
}

export function DeleteAnnouncementButton({ announcementId }: Readonly<Props>) {
  const { mutate: deleteAnnouncementRequest } =
    useDeleteAnnouncement(announcementId);
  const { colors } = useColors();
  const navigate = useNavigate();

  const deleteAnnouncement = useCallback(() => {
    if (window.confirm("정말로 이 공지를 삭제하시겠습니까?")) {
      deleteAnnouncementRequest(undefined, {
        onSuccess: () => {
          window.alert("공지사항이 성공적으로 삭제되었습니다.");
          navigate("/announcements");
        },
        onError: () => {
          window.alert("공지사항 삭제에 실패했습니다. 다시 시도해주세요.");
        },
      });
    }
  }, [deleteAnnouncementRequest, navigate]);

  return (
    <button
      onClick={deleteAnnouncement}
      data-testid="delete-announcement-button"
    >
      <TextChip
        label="삭제"
        icon="trash"
        color={colors.onPrimary}
        backgroundColor={colors.error}
      />
    </button>
  );
}
