import { AppIcon } from "@shared/ui/Icons";
import { renderWithProviders } from "@test-utils/renderer";

jest.unmock("@shared/ui/Icons");

jest.mock("../files/calendar-number.svg", () => () => null);

describe("AppIcon", () => {
  it("should render correctly", () => {
    renderWithProviders(
      <>
        <AppIcon icon="calendar-number" />
        <AppIcon icon="non-existant-icon" />
      </>
    );
  });
});
