import { ReactElement, PropsWithChildren } from "react";
import { render } from "@testing-library/react-native";
import { ThemeProvider } from "styled-components/native";

import { AlertProvider } from "@contexts/app";
import { AuthProvider, SignupProvider } from "@contexts/auth";
import { ThemeProvider as MyThemeProvider, lightColors } from "@contexts/theme";

export const renderWithProviders = (ui: ReactElement) => {
  function Wrapper({ children }: PropsWithChildren): JSX.Element {
    return (
      <ThemeProvider theme={{ colors: lightColors }}>
        <AlertProvider>
          <AuthProvider>
            <SignupProvider>
              <MyThemeProvider>{children}</MyThemeProvider>
            </SignupProvider>
          </AuthProvider>
        </AlertProvider>
      </ThemeProvider>
    );
  }

  return { ...render(ui, { wrapper: Wrapper }) };
};
