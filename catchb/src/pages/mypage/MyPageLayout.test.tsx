import { fireEvent } from "@testing-library/react-native";

import { MyPageLayout } from "./MyPageLayout";
import { renderWithProviders } from "@utils/test-utils";

describe("<MyPageLayout />", () => {
  it("renders correctly", () => {
    const { getByTestId } = renderWithProviders(<MyPageLayout />);

    fireEvent.press(getByTestId("back-button"));
  });
});
