import "expo-dev-client";
import { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";
import { Stack, SplashScreen } from "expo-router";
import axios from "axios";
import { ThemeProvider as StyledThemeProvider } from "styled-components/native";

import { initialize } from "./initialize";

import { lightColors } from "@shared/colors";
import { AlertProvider, ColorsProvider, useAlert } from "@shared/providers";

SplashScreen.preventAutoHideAsync();

axios.defaults.baseURL = process.env.EXPO_PUBLIC_API_URL;

export const unstable_settings = {
  initialRouteName: "index",
};

export function RootLayout() {
  const [ready, setReady] = useState<boolean>(false);

  useEffect(() => {
    const getImagePickerPermissions = async () => {
      await ImagePicker.requestMediaLibraryPermissionsAsync();
      await ImagePicker.requestCameraPermissionsAsync();
    };

    const initializeSocialLogin = async () => {
      const response = await initialize();

      if (response === "SUCCESS") {
        setReady(true);
      }
    };

    initializeSocialLogin();
    getImagePickerPermissions();
    SplashScreen.hideAsync();
  }, []);

  return (
    <StyledThemeProvider theme={{ colors: lightColors }}>
      <AlertProvider>
        <ColorsProvider>
          <GestureHandlerRootView>
            <AppRouter initialized={ready} />
          </GestureHandlerRootView>
        </ColorsProvider>
      </AlertProvider>
    </StyledThemeProvider>
  );
}

interface Props {
  initialized: boolean;
}

function AppRouter({ initialized }: Readonly<Props>) {
  const { showAlert } = useAlert();

  if (!initialized) {
    showAlert({
      title: "접속상태 이상",
      message:
        "현재 기기 접속 상태가 원활하지 않습니다.\n네트워크 연결 상태를 확인해 주십시오.",
    });
    return null;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="login" />
      <Stack.Screen name="signup" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
