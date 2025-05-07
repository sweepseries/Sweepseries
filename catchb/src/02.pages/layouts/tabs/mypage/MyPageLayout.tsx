import { Stack } from "expo-router";

import { HeaderLeftBackButton, HeaderLeftLogo } from "@widgets/layouts";

export function MyPageLayout() {
  return (
    <Stack
      screenOptions={{
        headerLeft: HeaderLeftBackButton,
        headerShadowVisible: false,
        headerTitle: "",
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerLeft: HeaderLeftLogo,
        }}
      />
    </Stack>
  );
}
