import { describe, expect, it, vi } from "vitest";
import { fireEvent, waitFor } from "@testing-library/react";
import * as Router from "react-router";

import { TermsManagementLayout } from "../ui/_layout";
import { renderWithProviders } from "@test-utils/renderer";

vi.mock("../ui/TermsList/TermsListPage", () => ({
  TermsListPage: vi.fn(() => <div>Terms List</div>),
}));
vi.mock("@widgets/layouts/modals", () => ({
  LargeModal: ({
    isOpen,
    onClose,
    children,
  }: {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
  }) => (
    <>
      {isOpen && (
        <div>
          <button onClick={onClose}>Close</button>
          {children}
        </div>
      )}
    </>
  ),
}));

describe("TermsManagementLayout", () => {
  it("renders list page", () => {
    vi.spyOn(Router, "useMatch").mockReturnValue(null);

    const { getByText } = renderWithProviders(<TermsManagementLayout />);

    expect(getByText("Terms List")).toBeInTheDocument();
  });

  it("opens modal for create term", () => {
    vi.spyOn(Router, "useMatch").mockReturnValue({
      params: {},
      pathname: "/terms/create",
      pattern: { path: "/terms/create", caseSensitive: false, end: true },
      pathnameBase: "",
    });

    const { getByText } = renderWithProviders(<TermsManagementLayout />);

    fireEvent.click(getByText("Close"));
    waitFor(() => expect(Router.useNavigate()).toHaveBeenCalledWith("/terms"));
  });
});
