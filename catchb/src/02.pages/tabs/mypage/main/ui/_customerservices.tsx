import { View } from "react-native";
import { router } from "expo-router";

import { useColors } from "@shared/lib/colors";
import { NavigateButton } from "@shared/ui/Buttons";

export function CustomerServiceButtons() {
  const { colors } = useColors();

  const openAnnouncementPage = () => {
    router.push("/mypage/announcements");
  };

  const openInquiryPage = () => {
    router.push("/mypage/inquiries");
  };

  const openFAQsPage = () => {
    router.push("/mypage/faqs");
  };

  return (
    <View>
      <NavigateButton
        icon="lightbulb"
        text="공지사항"
        onPress={openAnnouncementPage}
        color={colors.lowEmphasis}
      />
      <NavigateButton
        icon="chat"
        text="1:1 문의"
        onPress={openInquiryPage}
        color={colors.lowEmphasis}
      />
      <NavigateButton
        icon="questionmark-circle"
        text="자주 묻는 질문"
        onPress={openFAQsPage}
        color={colors.lowEmphasis}
      />
    </View>
  );
}
