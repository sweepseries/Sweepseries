import { MyPageLayout } from "@pages/layouts";
import { renderWithProviders } from "@test-utils/renderer";

describe("MyPageLayout", () => {
  it("renders correctly", () => {
    renderWithProviders(<MyPageLayout />);
  });
});
