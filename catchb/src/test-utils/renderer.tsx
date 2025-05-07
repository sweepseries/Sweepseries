import { ReactElement, PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "styled-components/native";
import { render } from "@testing-library/react-native";

import { AlertProvider } from "@shared/lib/alert";
import { AuthProvider } from "@shared/lib/auth";
import { ColorsProvider, sampleColors } from "@shared/lib/colors";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

export const renderWithProviders = (ui: ReactElement) => {
  function Wrapper({ children }: Readonly<PropsWithChildren>): JSX.Element {
    return (
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={{ colors: sampleColors }}>
          <AuthProvider>
            <ColorsProvider>
              <AlertProvider>{children}</AlertProvider>
            </ColorsProvider>
          </AuthProvider>
        </ThemeProvider>
      </QueryClientProvider>
    );
  }

  return render(ui, { wrapper: Wrapper });
};
