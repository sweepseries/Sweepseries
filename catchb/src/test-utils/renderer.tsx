import { ComponentType, ReactElement, ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "styled-components/native";
import { RenderOptions, render } from "@testing-library/react-native";

import { AlertProvider } from "@shared/lib/alert";
import { AuthProvider } from "@shared/lib/auth";
import { ColorsProvider, sampleColors } from "@shared/lib/colors";

export function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });
}

interface WrapperProps {
  children: ReactNode;
}

interface RenderWithProvidersOptions extends Omit<RenderOptions, "wrapper"> {
  client?: QueryClient;
  // 외부에서 추가로 감쌀 수 있는 wrapper 컴포넌트
  wrapper?: ComponentType<WrapperProps>;
}

export function renderWithProviders(
  ui: ReactElement,
  {
    client = createTestQueryClient(),
    wrapper: ExtraWrapper,
    ...rtlOptions
  }: RenderWithProvidersOptions = {}
) {
  function DefaultWrapper({ children }: Readonly<WrapperProps>): JSX.Element {
    return (
      <QueryClientProvider client={client}>
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

  function CombinedWrapper({ children }: Readonly<WrapperProps>): JSX.Element {
    return (
      <DefaultWrapper>
        {ExtraWrapper ? <ExtraWrapper>{children}</ExtraWrapper> : children}
      </DefaultWrapper>
    );
  }

  return { ...render(ui, { wrapper: CombinedWrapper, ...rtlOptions }), client };
}
