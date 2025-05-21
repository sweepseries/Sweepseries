import { describe, it, vi } from "vitest";

import App from "../App";
import { renderWithProviders } from "@test-utils/renderer";

vi.mock("./providers", () => ({
  AuthProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  AutoLoginProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  ColorsProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

describe("App", () => {
  it("renders correctly", () => {
    renderWithProviders(<App />);
  });
});
