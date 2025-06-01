import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, waitFor } from "@testing-library/react";
import * as Router from "react-router";

import { AnnouncementsManagementLayout } from "../ui/_layout";
import { renderWithProviders } from "@test-utils/renderer";

vi.mock("../ui/AnnouncementsList/AnnouncementsListPage", () => ({
  AnnouncementsListPage: vi.fn(() => <div>Announcements List</div>),
}));
vi.mock("@widgets/layouts/modals", () => ({
  Modal: ({
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

describe("AnnouncementsManagementLayout", () => {
  const navigateMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(Router, "useNavigate").mockReturnValue(navigateMock);
  });

  it("renders list page", () => {
    vi.spyOn(Router, "useMatch").mockReturnValue(null);

    const { getByText } = renderWithProviders(
      <AnnouncementsManagementLayout />
    );

    expect(getByText("Announcements List")).toBeInTheDocument();
  });

  it("opens modal for create announcement", async () => {
    vi.spyOn(Router, "useMatch").mockReturnValue({
      params: {},
      pathname: "/announcements/create",
      pattern: {
        path: "/announcements/create",
        caseSensitive: false,
        end: true,
      },
      pathnameBase: "",
    });

    const { getByText } = renderWithProviders(
      <AnnouncementsManagementLayout />
    );

    fireEvent.click(getByText("Close"));
    await waitFor(() =>
      expect(navigateMock).toHaveBeenCalledWith("/announcements")
    );
  });
});
