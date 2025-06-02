import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, waitFor } from "@testing-library/react";
import * as Router from "react-router";

import { FAQsManagementLayout } from "../ui/_layout";
import { renderWithProviders } from "@test-utils/renderer";

vi.mock("../ui/FAQsList/FAQsListPage", () => ({
  FAQsListPage: vi.fn(() => <div>FAQs List</div>),
}));

describe("FAQsManagementLayout", () => {
  const navigateMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(Router, "useNavigate").mockReturnValue(navigateMock);
  });

  it("renders list page", () => {
    vi.spyOn(Router, "useMatch").mockReturnValue(null);

    const { getByText } = renderWithProviders(<FAQsManagementLayout />);

    expect(getByText("FAQs List")).toBeInTheDocument();
  });

  it("opens modal for create FAQ", async () => {
    vi.spyOn(Router, "useMatch").mockReturnValue({
      params: {},
      pathname: "/faqs/create",
      pattern: {
        path: "/faqs/create",
        caseSensitive: false,
        end: true,
      },
      pathnameBase: "",
    });

    const { getByText } = renderWithProviders(<FAQsManagementLayout />);
    fireEvent.click(getByText("Close"));
    await waitFor(() => expect(navigateMock).toHaveBeenCalledWith("/faqs"));
  });
});
