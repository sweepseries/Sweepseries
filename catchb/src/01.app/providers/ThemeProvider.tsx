import { ThemeProvider as StyledThemeProvider } from "styled-components/native";

import { ColorsProvider, useColors } from "@shared/lib/colors";

interface Props {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: Readonly<Props>) {
  return (
    <ColorsProvider>
      <InnerProvider>{children}</InnerProvider>
    </ColorsProvider>
  );
}

function InnerProvider({ children }: Readonly<Props>) {
  const { colors } = useColors();

  return (
    <StyledThemeProvider theme={{ colors }}>{children}</StyledThemeProvider>
  );
}
