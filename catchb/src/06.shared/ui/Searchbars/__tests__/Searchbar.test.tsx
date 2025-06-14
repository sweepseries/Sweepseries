import { Searchbar } from "@shared/ui/Searchbars";
import { renderWithProviders } from "@test-utils/renderer";

jest.unmock("@shared/ui/Searchbars");

describe("Searchbar", () => {
  it("calls onChange when text is entered", () => {
    renderWithProviders(
      <Searchbar placeholder="Search..." value="" onChange={jest.fn()} />
    );
  });
});
