import { Stack } from "expo-router";

import { HeaderLeftBackButton, HeaderLeftLogo } from "@widgets/layouts";
import { ActiveProfile } from "@features/community/switch-profile";

export function PostsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        headerTitle: "",
      }}
    >
      <Stack.Screen
        name="index"
        options={{ headerLeft: HeaderLeftLogo, headerRight: ActiveProfile }}
      />
      <Stack.Screen
        name="create"
        options={{ headerLeft: HeaderLeftBackButton, headerTitle: "글쓰기" }}
      />
      <Stack.Screen
        name="[id]"
        options={{ headerLeft: HeaderLeftBackButton, headerTitle: "" }}
      />
    </Stack>
  );
}
