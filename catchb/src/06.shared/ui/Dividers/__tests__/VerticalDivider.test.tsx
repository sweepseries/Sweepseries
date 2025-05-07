import { VerticalDivider } from "@shared/ui/Dividers";
import { renderWithProviders } from "@test-utils/renderer";

jest.unmock("@shared/ui/Dividers");

describe("VerticalDivider", () => {
  it("should render correctly", () => {
    renderWithProviders(<VerticalDivider />);
  });
});
