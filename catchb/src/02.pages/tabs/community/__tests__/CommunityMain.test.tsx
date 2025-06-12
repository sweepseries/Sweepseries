import { act, fireEvent, waitFor } from "@testing-library/react-native";
import * as Router from "expo-router";
import axios from "axios";

import { CommunityMain } from "@pages/tabs/community";
import {
  CommunityProvider,
  sampleCommunityInitializerResponse,
} from "@entities/community";
import * as AlertAPI from "@shared/lib/alert";
import { renderWithProviders } from "@test-utils/renderer";

/**
 * 커뮤니티 게시글 목록 페이지 테스트
 * 이 테스트 케이스에서는 Actual API를 사용한다
 */

describe("커뮤니티 게시글 목록 페이지", () => {
  it("api 오류", async () => {
    const showAlertMock = jest.fn();
    jest.spyOn(AlertAPI, "useAlert").mockReturnValue({
      showAlert: showAlertMock,
    });
    jest.spyOn(axios, "get").mockRejectedValueOnce(new Error("API Error"));

    waitFor(() =>
      renderWithProviders(
        <CommunityProvider>
          <CommunityMain />
        </CommunityProvider>
      )
    );

    await waitFor(() => {
      expect(showAlertMock).toHaveBeenCalledWith(
        expect.objectContaining({
          title: "커뮤니티 데이터 로드 실패",
          message:
            "커뮤니티 데이터를 불러오는 데 실패했습니다. 다시 시도해주세요.",
        })
      );
    });
  });

  it("api 오류: 데이터 없음", async () => {
    const showAlertMock = jest.fn();
    jest.spyOn(AlertAPI, "useAlert").mockReturnValue({
      showAlert: showAlertMock,
    });
    jest
      .spyOn(axios, "get")
      .mockResolvedValue({ data: { forums: [], profiles: [] } });

    waitFor(() =>
      renderWithProviders(
        <CommunityProvider>
          <CommunityMain />
        </CommunityProvider>
      )
    );

    await waitFor(() => {
      expect(showAlertMock).toHaveBeenCalledWith(
        expect.objectContaining({
          title: "데이터 로드 실패",
          message: "오류가 발생했습니다. 관리자에게 문의해주세요.",
        })
      );
    });
  });

  it("Top Tabs: 누르거나 스크롤 하면, 해당 탭 게시글 목록 표기", async () => {
    jest
      .spyOn(axios, "get")
      .mockResolvedValue({ data: sampleCommunityInitializerResponse });

    const { getByTestId } = await waitFor(() =>
      renderWithProviders(
        <CommunityProvider>
          <CommunityMain />
        </CommunityProvider>
      )
    );

    await waitFor(() => {
      expect(getByTestId("community-tab-text-덕아웃")).toBeTruthy();
    });

    // Test Tab Press
    fireEvent.press(getByTestId("community-tab-드래프트"));

    // Test Page Scroll
    const pagerView = getByTestId("community-pager-view");
    act(() => {
      pagerView.props.onPageSelected({
        nativeEvent: { position: 2 },
      });
    });
    act(() => {
      pagerView.props.onPageScroll({
        nativeEvent: { position: 2, offset: 0.5 },
      });
    });
  });

  it("글쓰기 Floating Button", async () => {
    const { getByTestId } = renderWithProviders(
      <CommunityProvider>
        <CommunityMain />
      </CommunityProvider>
    );

    await waitFor(() => {
      expect(getByTestId("create-post-button")).toBeTruthy();
    });

    fireEvent.press(getByTestId("create-post-button"));
    await waitFor(() => {
      expect(Router.router.push).toHaveBeenCalledWith(
        "/community/posts/create"
      );
    });
  });
});
