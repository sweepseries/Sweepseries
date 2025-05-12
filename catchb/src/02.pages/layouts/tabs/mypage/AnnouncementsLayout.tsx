import { Stack } from "expo-router";

import { HeaderLeftBackButton, HeaderTitle } from "@widgets/layouts";

export function AnnouncementsLayout() {
  return (
    <Stack
      screenOptions={{
        headerLeft: HeaderLeftBackButton,
        headerShadowVisible: false,
        headerTitle: AnnouncementsPageHeaderTitle,
      }}
    >
      <Stack.Screen name="[announcementId]" />
      <Stack.Screen name="index" />
    </Stack>
  );
}

function AnnouncementsPageHeaderTitle() {
  return <HeaderTitle title="공지사항" />;
}
