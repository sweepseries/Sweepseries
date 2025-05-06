import { FrontLayout } from "@pages/layouts";
import { renderWithProviders } from "@test-utils/renderer";

describe("FrontLayout", () => {
  it("renders correctly", () => {
    renderWithProviders(<FrontLayout />);
  });
});
