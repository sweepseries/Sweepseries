import { InputField } from "@shared/lib/signup";
import { renderWithProviders } from "@test-utils/renderer";

describe("InputField", () => {
  it("renders with default props", () => {
    const { getByPlaceholderText } = renderWithProviders(
      <InputField
        value=""
        onChangeText={() => {}}
        placeholder="Enter your email"
      />
    );

    expect(getByPlaceholderText("Enter your email")).toBeTruthy();
  });

  it("renders with title and error message", () => {
    const { getByText } = renderWithProviders(
      <InputField
        value=""
        onChangeText={() => {}}
        placeholder="Enter your email"
        title="Email"
        errorMessage="Invalid email address"
      />
    );

    expect(getByText("Email")).toBeTruthy();
    expect(getByText("Invalid email address")).toBeTruthy();
  });
});
