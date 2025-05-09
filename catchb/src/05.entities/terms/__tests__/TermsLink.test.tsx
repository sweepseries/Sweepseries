import { fireEvent } from "@testing-library/react-native";

import { TermsLink } from "@entities/terms";
import { renderWithProviders } from "@test-utils/renderer";

describe("TermsLink", () => {
  it("should call onPress when pressed", () => {
    const mockOnPress = jest.fn();
    const { getByTestId } = renderWithProviders(
      <TermsLink text="Terms and Conditions" onPress={mockOnPress} />
    );

    fireEvent.press(getByTestId("terms-link"));
    expect(mockOnPress).toHaveBeenCalled();
  });
});
