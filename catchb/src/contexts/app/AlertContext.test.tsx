import { TouchableOpacity } from "react-native";
import { fireEvent, render } from "@testing-library/react-native";

import { AlertProvider, useAlert } from "./AlertContext";
import { renderWithProviders } from "@utils/test-utils";

const TestComponent = () => {
  const { showAlert } = useAlert();

  return (
    <>
      <TouchableOpacity
        onPress={() =>
          showAlert({
            title: "Test Alert 1",
            message: "This is a test alert.",
            onConfirm: jest.fn(),
          })
        }
        testID="show-alert"
      />
      <TouchableOpacity
        onPress={() =>
          showAlert({
            title: "Test Alert 2",
            message: "This is a test alert.",
            confirmText: "OK",
            onConfirm: jest.fn(),
          })
        }
        testID="show-alert-custom-text"
      />
    </>
  );
};

describe("<AlertContext />", () => {
  it("should show alert when button is pressed", () => {
    const { getByTestId } = renderWithProviders(
      <AlertProvider>
        <TestComponent />
      </AlertProvider>
    );

    fireEvent.press(getByTestId("show-alert"));
    fireEvent.press(getByTestId("confirm"));
  });

  it("handles context misuse", () => {
    jest.spyOn(console, "error").mockImplementation(() => {});

    expect(() => render(<TestComponent />)).toThrow();
  });
});
