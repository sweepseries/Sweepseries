import { fireEvent } from "@testing-library/react-native";

import { DropdownMenu } from "@shared/ui/Menus";
import { renderWithProviders } from "@test-utils/renderer";

describe("DropdownMenu", () => {
  it("renders correctly with options", () => {
    const options = [
      { label: "Option 1", onPress: jest.fn() },
      { label: "Option 2", onPress: jest.fn() },
    ];

    const { getByTestId } = renderWithProviders(
      <DropdownMenu options={options}>
        <div>Open Menu</div>
      </DropdownMenu>
    );

    fireEvent.press(getByTestId("menu")); // Open the menu
    fireEvent.press(getByTestId("Option 1")); // Select first option
  });
});
