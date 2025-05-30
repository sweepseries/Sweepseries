import { describe, expect, it, vi } from "vitest";

import { AnnouncementsContainer } from "../ui/AnnouncementsContainer";
import { renderWithProviders } from "@test-utils/renderer";

vi.mock("../ui/_layout", () => ({
  AnnouncementsManagementLayout: vi.fn(() => (
    <div>Announcements Management Layout</div>
  )),
}));

describe("AnnouncementsContainer", () => {
  it("renders AnnouncementsManagementLayout with nested routes", () => {
    const { getByText } = renderWithProviders(<AnnouncementsContainer />);

    expect(getByText("Announcements Management Layout")).toBeInTheDocument();
  });
});
