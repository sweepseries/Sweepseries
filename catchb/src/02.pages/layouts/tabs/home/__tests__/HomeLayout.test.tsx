import { HomeLayout } from "@pages/layouts";
import { renderWithProviders } from "@test-utils/renderer";

describe("HomeLayout", () => {
  it("renders correctly", () => {
    renderWithProviders(<HomeLayout />);
  });
});
