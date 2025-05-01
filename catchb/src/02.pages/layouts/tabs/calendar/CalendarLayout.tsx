import { Stack } from "expo-router";

import { HeaderLeftBackButton } from "@widgets/layouts";

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
