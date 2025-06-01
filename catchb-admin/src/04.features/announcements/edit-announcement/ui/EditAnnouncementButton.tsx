import { useNavigate } from "react-router";

import { useColors } from "@shared/lib/colors";
import { TextChip } from "@shared/ui/Chips";

interface Props {
  announcementId: number;
}

export function EditAnnouncementButton({ announcementId }: Readonly<Props>) {
  const { colors } = useColors();
  const navigate = useNavigate();

  const toggleEditMode = () => {
    navigate(`/announcements/${announcementId}/edit`);
  };

  return (
    <button onClick={toggleEditMode} data-testid="edit-announcement-button">
      <TextChip
        label="수정"
        icon="pencil"
        color={colors.onPrimary}
        backgroundColor={colors.primary}
      />
    </button>
  );
}
