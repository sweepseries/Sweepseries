import { act, fireEvent, waitFor } from "@testing-library/react-native";

import { CommunityMain } from "@pages/tabs/community";
import { CommunityProvider } from "@entities/community";
import { sampleColors } from "@shared/lib/colors";
import { renderWithProviders } from "@test-utils/renderer";

describe("커뮤니티 게시글 목록 페이지", () => {
  it("Top Tabs: 누르거나 스크롤 하면, 해당 탭 게시글 목록 표기", async () => {
    const { getByTestId } = renderWithProviders(
      <CommunityProvider>
        <CommunityMain />
      </CommunityProvider>
    );

    // Test Tab Press
    await waitFor(() => {
      fireEvent.press(getByTestId("community-tab-드래프트"));
    });
    expect(getByTestId("community-tab-text-덕아웃")).toHaveStyle({
      color: sampleColors.lowEmphasis,
    });
    expect(getByTestId("community-tab-text-드래프트")).toHaveStyle({
      color: sampleColors.primary,
    });
    expect(getByTestId("community-tab-text-마켓")).toHaveStyle({
      color: sampleColors.lowEmphasis,
    });

    // Test Page Scroll
    const pagerView = getByTestId("community-pager-view");
    act(() => {
      pagerView.props.onPageScroll({
        nativeEvent: { position: 2, offset: 0.5 },
      });
      pagerView.props.onPageSelected({
        nativeEvent: { position: 2 },
      });
    });
    await waitFor(() => {
      expect(getByTestId("community-tab-text-덕아웃")).toHaveStyle({
        color: sampleColors.lowEmphasis,
      });
      expect(getByTestId("community-tab-text-드래프트")).toHaveStyle({
        color: sampleColors.lowEmphasis,
      });
      expect(getByTestId("community-tab-text-마켓")).toHaveStyle({
        color: sampleColors.primary,
      });
    });
  });
});
