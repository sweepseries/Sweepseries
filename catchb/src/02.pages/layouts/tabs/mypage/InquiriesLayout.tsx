import { Stack } from "expo-router";

import { HeaderLeftBackButton, HeaderTitle } from "@widgets/layouts";

export function InquiriesLayout() {
  return (
    <Stack
      screenOptions={{
        headerLeft: HeaderLeftBackButton,
        headerShadowVisible: false,
        headerTitle: InquiriessPageHeaderTitle,
      }}
    >
      <Stack.Screen name="[inquiryId]" />
      <Stack.Screen name="index" />
    </Stack>
  );
}

function InquiriessPageHeaderTitle() {
  return <HeaderTitle title="1:1 문의" />;
}
