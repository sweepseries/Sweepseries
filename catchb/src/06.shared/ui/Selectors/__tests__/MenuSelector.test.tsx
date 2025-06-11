import { Text } from "react-native";
import { fireEvent } from "@testing-library/react-native";

import { MenuSelector } from "@shared/ui/Selectors";
import { renderWithProviders } from "@test-utils/renderer";

jest.unmock("@shared/ui/Selectors");

describe("MenuSelector", () => {
  it("should render and handle button press correctly", () => {
    const mockOnSelect = jest.fn();
    const { getByTestId } = renderWithProviders(
      <MenuSelector
        options={["Option 1", "Option 2"]}
        selected="Option 1"
        onSelect={mockOnSelect}
        keyExtractor={(option) => option}
      >
        <Text>Select an option</Text>
      </MenuSelector>
    );

    fireEvent.press(getByTestId("selector"));
    fireEvent.press(getByTestId("Option 2"));

    expect(mockOnSelect).toHaveBeenCalledWith("Option 2");
  });
});
