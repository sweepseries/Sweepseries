import { Stack } from "expo-router";

import { SwitchCommunityProfileProvider } from "@features/community/switch-profile";
import { CommunityProvider } from "@entities/community";

export function CommunityLayout() {
  return (
    <CommunityProvider>
      <SwitchCommunityProfileProvider>
        <Stack
          screenOptions={{
            headerShadowVisible: false,
            headerTitle: "",
          }}
        >
          <Stack.Screen name="posts" options={{ headerShown: false }} />
        </Stack>
      </SwitchCommunityProfileProvider>
    </CommunityProvider>
  );
}
