import { fireEvent } from "@testing-library/react-native";

import { CommunityMain } from "@pages/tabs/community";
import { renderWithProviders } from "@test-utils/renderer";

describe("커뮤니티 게시글 목록 페이지", () => {
  it("Top Tabs: 누르면, 해당 탭 게시글 목록 표기", () => {
    const { getByTestId } = renderWithProviders(<CommunityMain />);

    fireEvent.press(getByTestId("community-tab-덕아웃"));
    fireEvent.press(getByTestId("community-tab-드래프트"));
    fireEvent.press(getByTestId("community-tab-마켓"));
  });
});
