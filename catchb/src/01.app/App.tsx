import "expo-dev-client";
import { SplashScreen } from "expo-router";
import axios from "axios";

import {
  AlertProvider,
  AuthProvider,
  AutoLoginProvider,
  PermissionsProvider,
  QueryProvider,
  ServerConnectProvider,
  ThemeProvider,
} from "./providers";
import { RootLayout } from "@pages/layouts";

SplashScreen.preventAutoHideAsync();

axios.defaults.baseURL = process.env.EXPO_PUBLIC_API_URL;

// !! 중요 !!
// PermissionsProvider가 가장 바깥단에, 그 다음에 QueryClientProvider가 위치해야 함.
// AutoLoginProvider가 가장 안쪽단에, ServerConnectProvider는 AutoLoginProvider 직전에 위치해야 함.

export function App() {
  return (
    <PermissionsProvider>
      <QueryProvider>
        <ThemeProvider>
          <AlertProvider>
            <AuthProvider>
              <ServerConnectProvider>
                <AutoLoginProvider>
                  <RootLayout />
                </AutoLoginProvider>
              </ServerConnectProvider>
            </AuthProvider>
          </AlertProvider>
        </ThemeProvider>
      </QueryProvider>
    </PermissionsProvider>
  );
}
