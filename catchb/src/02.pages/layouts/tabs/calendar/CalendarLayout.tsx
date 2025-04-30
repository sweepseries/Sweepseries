import { Stack } from "expo-router";

import { HeaderLeftBackButton } from "@features/layouts";

export function CalendarLayout() {
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
