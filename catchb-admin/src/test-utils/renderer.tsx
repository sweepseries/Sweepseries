import type { JSX, ReactElement, PropsWithChildren } from "react";
import { BrowserRouter } from "react-router";
import { ThemeProvider } from "styled-components";
import { render } from "@testing-library/react";

import { AuthProvider, ColorsProvider } from "../01.app/providers";
import { light } from "@shared/lib/colors";

export function renderWithProviders(ui: ReactElement) {
  function Wrapper({ children }: Readonly<PropsWithChildren>): JSX.Element {
    return (
      <ThemeProvider theme={{ colors: light }}>
        <AuthProvider>
          <ColorsProvider>
            <BrowserRouter>{children}</BrowserRouter>
          </ColorsProvider>
        </AuthProvider>
      </ThemeProvider>
    );
  }

  return {
    ...render(ui, { wrapper: Wrapper }),
  };
}
