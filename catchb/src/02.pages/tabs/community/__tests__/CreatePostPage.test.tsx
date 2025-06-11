import { fireEvent, waitFor } from "@testing-library/react-native";

import { CreatePostPage } from "@pages/tabs/community";
import { CommunityTestWrapper } from "@entities/community";
import { renderWithProviders } from "@test-utils/renderer";

describe("CreatePostPage", () => {
  it("renders correctly", async () => {
    const { getByTestId, getByText } = renderWithProviders(
      <CommunityTestWrapper>
        <CreatePostPage />
      </CommunityTestWrapper>
    );

    await waitFor(() => {
      expect(getByTestId("등록")).toBeTruthy();
    });

    // select new forum
    fireEvent.press(getByTestId("select-드래프트"));

    await waitFor(() => {
      expect(getByText("드래프트 태그1")).toBeTruthy();
    });

    // select same forum
    fireEvent.press(getByTestId("select-드래프트"));
  });
});
