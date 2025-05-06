import { ReactElement, PropsWithChildren } from "react";
import { render } from "@testing-library/react-native";

import { ColorsProvider } from "@shared/lib/colors";

export const renderWithProviders = (ui: ReactElement) => {
  function Wrapper({ children }: PropsWithChildren): JSX.Element {
    return <ColorsProvider>{children}</ColorsProvider>;
  }

  return { ...render(ui, { wrapper: Wrapper }) };
};
