import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, waitFor } from "@testing-library/react";
import * as Router from "react-router";

import { InquiriesManagementLayout } from "../ui/_layout";
import { renderWithProviders } from "@test-utils/renderer";

vi.mock("../ui/InquiriesList/InquiriesListPage", () => ({
  InquiriesListPage: vi.fn(() => <div>Inquiries List</div>),
}));

describe("InquiriesManagementLayout", () => {
  const navigateMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(Router, "useNavigate").mockReturnValue(navigateMock);
  });

  it("renders list page", () => {
    vi.spyOn(Router, "useMatch").mockReturnValue(null);

    const { getByText } = renderWithProviders(<InquiriesManagementLayout />);

    expect(getByText("Inquiries List")).toBeInTheDocument();
  });

  it("opens modal for create inquiry", async () => {
    vi.spyOn(Router, "useMatch").mockReturnValue({
      params: {},
      pathname: "/inquiries/1",
      pattern: {
        path: "/inquiries/:id",
        caseSensitive: false,
        end: true,
      },
      pathnameBase: "",
    });

    const { getByText } = renderWithProviders(<InquiriesManagementLayout />);

    fireEvent.click(getByText("Close"));
    await waitFor(() =>
      expect(navigateMock).toHaveBeenCalledWith("/inquiries")
    );
  });
});
