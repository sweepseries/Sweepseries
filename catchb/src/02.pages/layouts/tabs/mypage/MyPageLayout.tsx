import { Stack } from "expo-router";

import { HeaderLeftBackButton } from "@features/layouts";

export function MyPageLayout() {
  return (
    <Stack
      screenOptions={{
        headerLeft: HeaderLeftBackButton,
        headerShadowVisible: false,
        headerTitle: "",
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
  );
}
