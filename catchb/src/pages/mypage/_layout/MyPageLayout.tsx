import { Stack, router } from "expo-router";

import { BackButton } from "@components/Buttons";
import { CatchBLogo } from "@features/CatchB";

function HeaderLeftLogo() {
  return <CatchBLogo type="horizontal" height={30} />;
}

function HeaderLeftBackButton() {
  return <BackButton onPress={() => router.back()} />;
}

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
