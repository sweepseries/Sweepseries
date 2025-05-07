import { CalendarLayout } from "@pages/layouts";
import { renderWithProviders } from "@test-utils/renderer";

describe("CalendarLayout", () => {
  it("renders correctly", () => {
    renderWithProviders(<CalendarLayout />);
  });
});
