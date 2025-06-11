import { ErrorGuide } from "@shared/ui/Fallbacks";
import { renderWithProviders } from "@test-utils/renderer";

jest.unmock("@shared/ui/Fallbacks");

describe("ErrorGuide Component", () => {
  it("renders correctly with a message", () => {
    const { getByText } = renderWithProviders(
      <ErrorGuide message="An error occurred." />
    );

    expect(getByText("An error occurred.")).toBeTruthy();
  });
});
