import { Stack } from "expo-router";

import { HeaderLeftLogo } from "@widgets/layouts";

export function HomeLayout() {
  return (
    <Stack
      screenOptions={{
        headerLeft: HeaderLeftLogo,
        headerShadowVisible: false,
        headerTitle: "",
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
  );
}
