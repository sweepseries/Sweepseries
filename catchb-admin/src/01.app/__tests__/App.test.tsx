import { describe, it, vi } from "vitest";
import { render } from "@testing-library/react";

import App from "../App";
import * as AuthAPI from "@shared/lib/auth";

vi.mock("../providers", () => ({
  AuthProvider: ({ children }: { children: React.ReactNode }) => children,
  AutoLoginProvider: ({ children }: { children: React.ReactNode }) => children,
  ColorsProvider: ({ children }: { children: React.ReactNode }) => children,
  QueryProvider: ({ children }: { children: React.ReactNode }) => children,
}));
vi.mock("@pages/login", () => ({
  LoginPage: () => <div>Login Page</div>,
}));
vi.mock("@pages/terms", () => ({
  TermsContainer: () => <div>Terms Container</div>,
}));
vi.mock("@widgets/fallback/notfound", () => ({
  NotFoundPage: () => <div>Not Found Page</div>,
}));
vi.mock("@widgets/layouts/root", () => ({
  RootLayout: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

describe("App", () => {
  it("renders correctly when authenticated", () => {
    vi.spyOn(AuthAPI, "useAuth").mockReturnValue({
      isAuthenticated: true,
      login: vi.fn(),
      logout: vi.fn(),
    });

    render(<App />);
  });

  it("renders correctly when not authenticated", () => {
    vi.spyOn(AuthAPI, "useAuth").mockReturnValue({
      isAuthenticated: false,
      login: vi.fn(),
      logout: vi.fn(),
    });

    render(<App />);
  });
});
