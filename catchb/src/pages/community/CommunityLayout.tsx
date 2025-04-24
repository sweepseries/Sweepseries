import { Stack, router } from "expo-router";

import { BackButton } from "@components/Buttons";

function HeaderLeftBackButton() {
  return <BackButton onPress={() => router.back()} />;
}

export function CommunityLayout() {
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
