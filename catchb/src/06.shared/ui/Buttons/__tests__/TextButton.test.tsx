import { fireEvent } from "@testing-library/react-native";

import { TextButton } from "@shared/ui/Buttons";
import { renderWithProviders } from "@test-utils/renderer";

jest.unmock("@shared/ui/Buttons");

describe("TextButton", () => {
  it("should call onPress when pressed", () => {
    const onPressMock = jest.fn();

    const { getByTestId } = renderWithProviders(
      <TextButton text="Test" onPress={onPressMock} />
    );
    
    fireEvent.press(getByTestId("text-button"));
    expect(onPressMock).toHaveBeenCalled();
  });

  it("should not call onPress when button is disabled", () => {
    const onPressMock = jest.fn();

    const { getByTestId } = renderWithProviders(
      <TextButton text="Test" onPress={onPressMock} active={false} />
    );
    
    fireEvent.press(getByTestId("text-button"));
    expect(onPressMock).not.toHaveBeenCalled();
  });
});
