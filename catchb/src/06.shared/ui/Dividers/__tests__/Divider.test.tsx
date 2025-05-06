import { Divider } from "@shared/ui/Dividers";
import { renderWithProviders } from "@test-utils/renderer";

jest.unmock("@shared/ui/Dividers");

describe("Divider", () => {
  it("should render correctly", () => {
    renderWithProviders(
      <>
        <Divider />
        <Divider bold />
      </>
    );
  });
});
