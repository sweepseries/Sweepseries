import { router } from "expo-router";

import { useColors } from "@shared/lib/colors";
import { NavigateButton } from "@shared/ui/Buttons";

export function AnnouncementsButton() {
  const { colors } = useColors();

  const openAnnouncementPage = () => {
    router.push("/mypage/announcements");
  };

  return (
    <NavigateButton
      icon="lightbulb"
      text="공지사항"
      onPress={openAnnouncementPage}
      color={colors.lowEmphasis}
    />
  );
}
