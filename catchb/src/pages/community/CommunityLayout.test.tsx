import { fireEvent } from "@testing-library/react-native";

import { CommunityLayout } from "./CommunityLayout";
import { renderWithProviders } from "@utils/test-utils";

describe("<CommunityLayout />", () => {
  it("renders correctly", () => {
    const { getByTestId } = renderWithProviders(<CommunityLayout />);

    fireEvent.press(getByTestId("back-button"));
  });
});
