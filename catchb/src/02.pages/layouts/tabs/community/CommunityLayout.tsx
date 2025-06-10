import { Stack } from "expo-router";

import { HeaderLeftLogo } from "@widgets/layouts";
import {
  ActiveProfile,
  SwitchCommunityProfileProvider,
} from "@features/community/switch-profile";
import { CommunityProvider } from "@entities/community";

export function CommunityLayout() {
  return (
    <CommunityProvider>
      <SwitchCommunityProfileProvider>
        <Stack
          screenOptions={{
            headerLeft: HeaderLeftLogo,
            headerShadowVisible: false,
            headerTitle: "",
          }}
        >
          <Stack.Screen name="index" options={{ headerRight: ActiveProfile }} />
        </Stack>
      </SwitchCommunityProfileProvider>
    </CommunityProvider>
  );
}
