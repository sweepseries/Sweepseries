import { fireEvent, render, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { AuthProvider, useAuth } from "@shared/lib/auth";

vi.unmock("@shared/lib/auth");

const MockComponent = () => {
  const { isAuthenticated, login, logout } = useAuth();

  return (
    <div>
      <p>Authenticated: {isAuthenticated ? "Yes" : "No"}</p>
      <button onClick={() => login("mockAccessToken")}>Login</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

describe("AuthProvider", () => {
  it("test login and logout", () => {
    const { getByText } = render(
      <AuthProvider>
        <MockComponent />
      </AuthProvider>
    );

    waitFor(() => expect(getByText("Authenticated: No")).toBeInTheDocument());

    fireEvent.click(getByText("Login"));
    waitFor(() => {
      expect(getByText("Authenticated: Yes")).toBeInTheDocument();
      expect(useAuth().login).toHaveBeenCalledWith("mockAccessToken");
    });

    fireEvent.click(getByText("Logout"));
    waitFor(() => {
      expect(getByText("Authenticated: No")).toBeInTheDocument();
      expect(useAuth().logout).toHaveBeenCalled();
    });
  });
});
