import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, waitFor } from "@testing-library/react";
import * as Router from "react-router";

import { TermsManagementLayout } from "../ui/_layout";
import { renderWithProviders } from "@test-utils/renderer";

vi.mock("../ui/TermsList/TermsListPage", () => ({
  TermsListPage: vi.fn(() => <div>Terms List</div>),
}));

describe("TermsManagementLayout", () => {
  const navigateMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(Router, "useNavigate").mockReturnValue(navigateMock);
  });

  it("renders list page", () => {
    vi.spyOn(Router, "useMatch").mockReturnValue(null);

    const { getByText } = renderWithProviders(<TermsManagementLayout />);

    expect(getByText("Terms List")).toBeInTheDocument();
  });

  it("opens modal for create term", async () => {
    vi.spyOn(Router, "useMatch").mockReturnValue({
      params: {},
      pathname: "/terms/create",
      pattern: { path: "/terms/create", caseSensitive: false, end: true },
      pathnameBase: "",
    });

    const { getByText } = renderWithProviders(<TermsManagementLayout />);

    fireEvent.click(getByText("Close"));
    await waitFor(() => expect(navigateMock).toHaveBeenCalledWith("/terms"));
  });
});
