import { fireEvent } from "@testing-library/react-native";

import { SignupLayout } from "./SignupLayout";
import { renderWithProviders } from "@utils/test-utils";

describe("<SignupLayout />", () => {
  it("renders correctly and handles back button", () => {
    const { getByTestId } = renderWithProviders(<SignupLayout />);

    fireEvent.press(getByTestId("back-button"));
  });
});
