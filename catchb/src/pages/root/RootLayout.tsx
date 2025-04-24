import "expo-dev-client";
import { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";
import { Stack, SplashScreen } from "expo-router";
import axios from "axios";
import { initializeKakaoSDK } from "@react-native-kakao/core";
import NaverLogin from "@react-native-seoul/naver-login";
import { ThemeProvider as StyledThemeProvider } from "styled-components/native";

import { AlertProvider, useAlert } from "@contexts/app";
import { AuthProvider } from "@contexts/auth";
import { ThemeProvider, lightColors } from "@contexts/theme";
import { initialize } from "@services/app";

SplashScreen.preventAutoHideAsync();

axios.defaults.baseURL = process.env.EXPO_PUBLIC_API_URL;

export const unstable_settings = {
  initialRouteName: "index",
};

export function RootLayout() {
  useEffect(() => {
    const getImagePickerPermissions = async () => {
      await ImagePicker.requestMediaLibraryPermissionsAsync();
      await ImagePicker.requestCameraPermissionsAsync();
    };

    getImagePickerPermissions();
    SplashScreen.hideAsync();
  }, []);

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <StyledThemeProvider theme={{ colors: lightColors }}>
      <AlertProvider>
        <AuthProvider>
          <ThemeProvider>
            <GestureHandlerRootView>
              <AppRouter />
            </GestureHandlerRootView>
          </ThemeProvider>
        </AuthProvider>
      </AlertProvider>
    </StyledThemeProvider>
  );
}

function AppRouter() {
  const [ready, setReady] = useState<boolean>(false);

  const { showAlert } = useAlert();

  useEffect(() => {
    const initializeSocialLogin = async () => {
      const response = await initialize();

      if (response) {
        initializeKakaoSDK(response.KAKAO_APP_KEY);

        NaverLogin.initialize({
          appName: "Catch B",
          consumerKey: response.NAVER_CONSUMER_KEY,
          consumerSecret: response.NAVER_CONSUMER_SECRET,
          serviceUrlSchemeIOS: "catchb",
        });

        setReady(true);
      } else {
        showAlert({
          title: "접속상태 이상",
          message:
            "현재 기기 접속 상태가 원활하지 않습니다.\n네트워크 연결 상태를 확인해 주십시오.",
        });
      }
    };

    initializeSocialLogin();
  }, []);

  if (!ready) {
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
