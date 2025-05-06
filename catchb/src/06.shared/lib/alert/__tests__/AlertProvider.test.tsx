import { TouchableOpacity } from "react-native";
import { fireEvent, render } from "@testing-library/react-native";

import { AlertProvider, useAlert } from "@shared/lib/alert";
import { renderWithProviders } from "@test-utils/renderer";

jest.unmock("@shared/lib/alert");

const MockComponent = () => {
  const { showAlert } = useAlert();

  const sampleAlert = () => {
    showAlert({
      title: "Test Alert",
      message: "This is a test alert",
      onConfirm: jest.fn(),
    });
  };

  return <TouchableOpacity onPress={sampleAlert} testID="show-alert" />;
};

describe("AlertProvider", () => {
  it("shows alert when button is pressed", () => {
    const { getByTestId, getByText } = renderWithProviders(
      <AlertProvider>
        <MockComponent />
      </AlertProvider>
    );

    // Simulate button press
    fireEvent.press(getByTestId("show-alert"));

    // Check if alert is shown
    expect(getByText("Test Alert")).toBeTruthy();
    expect(getByText("This is a test alert")).toBeTruthy();

    fireEvent.press(getByTestId("confirm"));
  });

  it("should throw an error if used outside of provider", () => {
    jest.spyOn(console, "error").mockImplementation(() => {});

    expect(() => render(<MockComponent />)).toThrow();
  });
});
