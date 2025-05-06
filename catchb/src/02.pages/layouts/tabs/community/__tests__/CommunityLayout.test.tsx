import { CommunityLayout } from "@pages/layouts";
import { renderWithProviders } from "@test-utils/renderer";

describe("CommunityLayout", () => {
  it("renders correctly", () => {
    renderWithProviders(<CommunityLayout />);
  });
});
