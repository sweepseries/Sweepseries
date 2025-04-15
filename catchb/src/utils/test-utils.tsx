import { ReactElement, PropsWithChildren } from "react";
import { render } from "@testing-library/react-native";
import { ThemeProvider } from "styled-components/native";

import { AuthProvider } from "@contexts/auth";
import { ThemeProvider as MyThemeProvider, lightColors } from "@contexts/theme";

export const renderWithProviders = (ui: ReactElement) => {
  function Wrapper({ children }: PropsWithChildren): JSX.Element {
    return (
      <ThemeProvider theme={{ colors: lightColors }}>
        <AuthProvider>
          <MyThemeProvider>{children}</MyThemeProvider>
        </AuthProvider>
      </ThemeProvider>
    );
  }

  return { ...render(ui, { wrapper: Wrapper }) };
};
