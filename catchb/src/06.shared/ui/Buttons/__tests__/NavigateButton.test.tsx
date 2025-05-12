import { NavigateButton } from "@shared/ui/Buttons";
import { renderWithProviders } from "@test-utils/renderer";
import { fireEvent } from "@testing-library/react-native";

jest.unmock("@shared/ui/Buttons");

describe("NavigateButton", () => {
  it("calls onPress when pressed", () => {
    const { getByTestId } = renderWithProviders(
      <NavigateButton icon="test-icon" text="Test Button" onPress={jest.fn()} />
    );

    fireEvent.press(getByTestId("Test Button-button"));
  });
});
