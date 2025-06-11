import { fireEvent, waitFor } from "@testing-library/react-native";

import { PostsLayout } from "@pages/layouts";
import { SwitchCommunityProfileProvider } from "@features/community/switch-profile";
import { CommunityTestWrapper } from "@entities/community";
import { renderWithProviders } from "@test-utils/renderer";

describe("PostsLayout", () => {
  it("renders and handles switch profile sheet correctly", async () => {
    const { getByTestId } = renderWithProviders(
      <CommunityTestWrapper>
        <SwitchCommunityProfileProvider>
          <PostsLayout />
        </SwitchCommunityProfileProvider>
      </CommunityTestWrapper>
    );

    await waitFor(() => {
      fireEvent.press(getByTestId("open-switch-profile-sheet"));
      fireEvent.press(getByTestId("profile-1"));
    });
  });
});
