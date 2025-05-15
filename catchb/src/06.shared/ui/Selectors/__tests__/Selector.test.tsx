import { fireEvent } from "@testing-library/react-native";

import { ChipSelector } from "@shared/ui/Selectors";
import { renderWithProviders } from "@test-utils/renderer";

jest.unmock("@shared/ui/Selectors");

describe("ChipSelector", () => {
  it("should render and handle button press correctly", () => {
    const mockOnSelect = jest.fn();
    const { getByTestId } = renderWithProviders(
      <ChipSelector
        options={["Option 1", "Option 2"]}
        selected="Option 1"
        onSelect={mockOnSelect}
      />
    );

    fireEvent.press(getByTestId("Option 2"));
  });
});
