import { Stack } from "expo-router";

import { CatchBLogo } from "@features/CatchB";

function HeaderLeftLogo() {
  return <CatchBLogo type="horizontal" height={30} />;
}

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
