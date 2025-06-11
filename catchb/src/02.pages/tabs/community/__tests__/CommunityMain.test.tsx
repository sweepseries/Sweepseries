import { fireEvent, waitFor } from "@testing-library/react-native";

import { CommunityMain } from "@pages/tabs/community";
import { CommunityProvider } from "@entities/community";
import { renderWithProviders } from "@test-utils/renderer";

describe("커뮤니티 게시글 목록 페이지", () => {
  it("Top Tabs: 누르면, 해당 탭 게시글 목록 표기", async () => {
    const { getByTestId } = renderWithProviders(
      <CommunityProvider>
        <CommunityMain />
      </CommunityProvider>
    );

    await waitFor(() => {
      fireEvent.press(getByTestId("community-tab-덕아웃"));
    });

    await waitFor(() => {
      fireEvent.press(getByTestId("community-tab-드래프트"));
    });

    await waitFor(() => {
      fireEvent.press(getByTestId("community-tab-마켓"));
    });
  });
});
