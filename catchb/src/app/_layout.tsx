import "expo-dev-client";
import { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useFonts } from "expo-font";
import * as ImagePicker from "expo-image-picker";
import { Stack, SplashScreen } from "expo-router";
import axios from "axios";
import { initializeKakaoSDK } from "@react-native-kakao/core";
import NaverLogin from "@react-native-seoul/naver-login";
import { ThemeProvider as StyledThemeProvider } from "styled-components/native";

import { AuthProvider } from "@contexts/auth";
import { ThemeProvider, lightColors } from "@contexts/theme";
import { initialize } from "@services/app";

SplashScreen.preventAutoHideAsync();

axios.defaults.baseURL = process.env.EXPO_PUBLIC_API_URL;

export const unstable_settings = {
  initialRouteName: "index",
};

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Sweep: require("@assets/fonts/NPSfont_bold.ttf"),
    SweepLight: require("@assets/fonts/NPSfont_regular.ttf"),
    SweepBold: require("@assets/fonts/NPSfont_bold.ttf"),
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    const getImagePickerPermissions = async () => {
      await ImagePicker.requestMediaLibraryPermissionsAsync();
      await ImagePicker.requestCameraPermissionsAsync();
    };

    if (loaded) {
      SplashScreen.hideAsync();
    }

    getImagePickerPermissions();
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <StyledThemeProvider theme={{ colors: lightColors }}>
      <AuthProvider>
        <ThemeProvider>
          <GestureHandlerRootView>
            <AppRouter />
          </GestureHandlerRootView>
        </ThemeProvider>
      </AuthProvider>
    </StyledThemeProvider>
  );
}

function AppRouter() {
  const [ready, setReady] = useState<boolean>(false);

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
      }
    };

    initializeSocialLogin();
  }, []);

  if (!ready) {
    // TODO: 서버 연결에 실패. 로딩 화면 띄우기
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
