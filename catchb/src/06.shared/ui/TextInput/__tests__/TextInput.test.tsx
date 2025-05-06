import { AuthTextInput } from "@shared/ui/TextInput";
import { renderWithProviders } from "@test-utils/renderer";

jest.unmock("@shared/ui/TextInput");

describe("AuthTextInput", () => {
  it("should render correctly", () => {
    const { getByTestId } = renderWithProviders(
      <AuthTextInput testID="auth-text-input" />
    );

    expect(getByTestId("auth-text-input")).toBeTruthy();
  });
});
