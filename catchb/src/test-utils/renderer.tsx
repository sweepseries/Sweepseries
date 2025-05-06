import { ReactElement, PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "styled-components/native";
import { render } from "@testing-library/react-native";

import { ColorsProvider, sampleColors } from "@shared/lib/colors";

const queryClient = new QueryClient();

export const renderWithProviders = (ui: ReactElement) => {
  function Wrapper({ children }: PropsWithChildren): JSX.Element {
    return (
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={{ colors: sampleColors }}>
          <ColorsProvider>{children}</ColorsProvider>
        </ThemeProvider>
      </QueryClientProvider>
    );
  }

  return render(ui, { wrapper: Wrapper });
};
