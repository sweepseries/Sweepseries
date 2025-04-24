import { Stack, router } from "expo-router";

import { BackButton } from "@components/Buttons";
import { HeaderTitle } from "@components/Texts";
import { SignupProvider } from "@contexts/auth";

function HeaderLeftBackButton() {
  return <BackButton onPress={() => router.back()} />;
}

function SignupLayoutHeaderTitle() {
  return <HeaderTitle>회원가입</HeaderTitle>;
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
          options={{ presentation: "modal", headerShown: false }}
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
