import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, waitFor } from "@testing-library/react";
import * as Router from "react-router";
import axios from "axios";

import { RootLayout } from "@widgets/layouts/root";
import * as AuthAPI from "@shared/lib/auth";
import { renderWithProviders } from "@test-utils/renderer";

describe("RootLayout", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(Router, "useLocation").mockReturnValue({
      pathname: "/home",
      state: {},
      key: "test",
      search: "",
      hash: "",
    });
  });

  it("falls back to login if not authenticated", () => {
    vi.spyOn(AuthAPI, "useAuth").mockReturnValue({
      isAuthenticated: false,
      login: vi.fn(),
      logout: vi.fn(),
    });

    renderWithProviders(<RootLayout />);

    waitFor(() =>
      expect(Router.Navigate).toHaveBeenCalledWith({ to: "/login" })
    );
  });

  it("shows contents if authenticated and handles tab click", () => {
    vi.spyOn(AuthAPI, "useAuth").mockReturnValue({
      isAuthenticated: true,
      login: vi.fn(),
      logout: vi.fn(),
    });

    const { getByText } = renderWithProviders(<RootLayout />);

    expect(getByText("Mocked Outlet")).toBeInTheDocument();

    fireEvent.click(getByText("코치 관리"));
  });

  it("handles logout success", () => {
    vi.spyOn(axios, "post").mockResolvedValue({});

    const { getByText } = renderWithProviders(<RootLayout />);

    fireEvent.click(getByText("로그아웃"));
    waitFor(() => {
      expect(Router.useNavigate()).toHaveBeenCalledWith("/login");
    });
  });

  it("handles logout fail", () => {
    vi.spyOn(axios, "post").mockRejectedValue({});
    vi.spyOn(window, "alert").mockImplementation(() => {});

    const { getByText } = renderWithProviders(<RootLayout />);

    fireEvent.click(getByText("로그아웃"));

    waitFor(() => {
      expect(Router.useNavigate()).toHaveBeenCalledWith("/login");
    });
  });
});
