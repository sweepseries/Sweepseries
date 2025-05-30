import { describe, expect, it, vi } from "vitest";
import * as Router from "react-router";

import { AnnouncementsManagementLayout } from "../ui/_layout";
import { renderWithProviders } from "@test-utils/renderer";

vi.mock("../ui/AnnouncementsList/AnnouncementsListPage", () => ({
  AnnouncementsListPage: vi.fn(() => <div>Announcements List</div>),
}));

describe("AnnouncementsManagementLayout", () => {
  it("renders list page", () => {
    vi.spyOn(Router, "useMatch").mockReturnValue(null);

    const { getByText } = renderWithProviders(
      <AnnouncementsManagementLayout />
    );

    expect(getByText("Announcements List")).toBeInTheDocument();
  });
});
