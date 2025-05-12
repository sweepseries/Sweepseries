import { AnnouncementsLayout } from "../AnnouncementsLayout";
import { renderWithProviders } from "@test-utils/renderer";

describe("AnnouncementsLayout", () => {
  it("renders correctly", () => {
    renderWithProviders(<AnnouncementsLayout />);
  });
});
