import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, waitFor } from "@testing-library/react";
import * as Router from "react-router";
import axios from "axios";

import { LoginPage } from "@pages/login";
import * as AuthAPI from "@shared/lib/auth";
import { renderWithProviders } from "@test-utils/renderer";

describe("LoginPage", () => {
  beforeEach(() => {
    vi.spyOn(AuthAPI, "useAuth").mockReturnValue({
      isAuthenticated: false,
      login: vi.fn(),
      logout: vi.fn(),
    });
  });

  it("handles redirect to home if already logged in", () => {
    vi.spyOn(AuthAPI, "useAuth").mockReturnValue({
      isAuthenticated: true,
      login: vi.fn(),
      logout: vi.fn(),
    });

    renderWithProviders(<LoginPage />);

    waitFor(() => {
      expect(Router.useNavigate()).toHaveBeenCalledWith("/home");
    });
  });

  it("handles login successfully + button click", () => {
    vi.spyOn(axios, "post").mockResolvedValue({
      data: { access: "mockedToken" },
    });
    const { getByTestId, getByText } = renderWithProviders(<LoginPage />);

    fireEvent.change(getByTestId("username-input"), {
      target: { value: "testuser" },
    });
    fireEvent.change(getByTestId("password-input"), {
      target: { value: "testpassword" },
    });

    fireEvent.click(getByText("로그인"));

    waitFor(() => {
      expect(Router.useNavigate()).toHaveBeenCalledWith("/home");
    });
  });

  it("handles login fail + keyboard enter", async () => {
    vi.spyOn(window, "alert").mockImplementation(() => {});
    vi.spyOn(axios, "post").mockRejectedValue({});
    renderWithProviders(<LoginPage />);

    await waitFor(() => {
      fireEvent.keyDown(window, { key: "Enter", code: "Enter" });
    });
  });
});
