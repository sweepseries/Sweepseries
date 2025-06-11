import { fireEvent, waitFor } from "@testing-library/react-native";

import { CommunityLayout } from "@pages/layouts";
import { renderWithProviders } from "@test-utils/renderer";

describe("CommunityLayout", () => {
  it("renders and handles switch profile sheet correctly", async () => {
    const { getByTestId } = renderWithProviders(<CommunityLayout />);

    await waitFor(() => {
      fireEvent.press(getByTestId("open-switch-profile-sheet"));
      fireEvent.press(getByTestId("profile-1"));
    });
  });
});
