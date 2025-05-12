import { Stack } from "expo-router";

import { HeaderLeftBackButton, HeaderTitle } from "@widgets/layouts";
import { SignupProvider } from "@shared/lib/signup";

function SignupLayoutHeaderTitle() {
  return <HeaderTitle title="회원가입" />;
}

export function SignupLayout() {
  return (
    <SignupProvider>
      <Stack
        screenOptions={{
          headerLeft: HeaderLeftBackButton,
          headerTitle: SignupLayoutHeaderTitle,
          headerShadowVisible: false,
        }}
        initialRouteName="terms/index"
      >
        <Stack.Screen
          name="terms/[id]"
          options={{
            presentation: "modal",
            headerShown: false,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen name="terms/index" />
        <Stack.Screen name="username" />
        <Stack.Screen name="password" />
        <Stack.Screen name="phone" />
        <Stack.Screen name="profile" />
      </Stack>
    </SignupProvider>
  );
}
