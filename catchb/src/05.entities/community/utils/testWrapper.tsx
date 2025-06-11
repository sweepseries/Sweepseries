import { ReactElement, PropsWithChildren } from "react";

import { CommunityProvider } from "../providers/CommunityProvider";
import { renderWithProviders } from "@test-utils/renderer";

export function renderWithCommunity(ui: ReactElement) {
  function Wrapper({ children }: Readonly<PropsWithChildren>): JSX.Element {
    return <CommunityProvider>{children}</CommunityProvider>;
  }

  return renderWithProviders(ui, { wrapper: Wrapper });
}
