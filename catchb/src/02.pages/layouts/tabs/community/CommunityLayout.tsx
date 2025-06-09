import { Stack } from "expo-router";

import { HeaderLeftLogo } from "@widgets/layouts";
import {
  ActiveProfile,
  SwitchProfileProvider,
} from "@features/community-profiles/switch-profile";
import { CommunityProfilesProvider } from "@entities/community-profiles";

export function CommunityLayout() {
  return (
    <CommunityProfilesProvider>
      <SwitchProfileProvider>
        <Stack
          screenOptions={{
            headerLeft: HeaderLeftLogo,
            headerRight: ActiveProfile,
            headerShadowVisible: false,
            headerTitle: "",
          }}
        >
          <Stack.Screen name="index" />
        </Stack>
      </SwitchProfileProvider>
    </CommunityProfilesProvider>
  );
}
