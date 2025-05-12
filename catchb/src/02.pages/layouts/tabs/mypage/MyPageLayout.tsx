import { Stack } from "expo-router";

import {
  HeaderLeftBackButton,
  HeaderLeftCloseButton,
  HeaderLeftLogo,
  HeaderTitle,
} from "@widgets/layouts";

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
      <Stack.Screen
        name="withdraw"
        options={{
          headerLeft: HeaderLeftCloseButton,
          headerTitle: WithdrawPageHeaderTitle,
          presentation: "containedModal",
        }}
      />
      <Stack.Screen
        name="announcements"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}

function WithdrawPageHeaderTitle() {
  return <HeaderTitle title="탈퇴하기" />;
}
