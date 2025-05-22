import { describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";

import { AuthContext, useAuth } from "@shared/lib/auth";

vi.unmock("@shared/lib/auth");

const MockComponent = () => {
  const { isAuthenticated } = useAuth();

  return <div>{isAuthenticated ? "Authenticated" : "Not Authenticated"}</div>;
};

const MockProvider = ({ children }: { children: React.ReactNode }) => {
  const authContextValue = {
    isAuthenticated: false,
    login: vi.fn(),
    logout: vi.fn(),
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

describe("useAuth", () => {
  it("should return isAuthenticated as false when not authenticated", () => {
    expect(() => render(<MockComponent />)).toThrow();
  });

  it("should return isAuthenticated as true when authenticated", () => {
    const { getByText } = render(
      <MockProvider>
        <MockComponent />
      </MockProvider>
    );

    expect(getByText("Not Authenticated")).toBeInTheDocument();
  });
});
