import { act, fireEvent, waitFor } from "@testing-library/react-native";
import * as Router from "expo-router";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import { CommunityMain } from "@pages/tabs/community";
import {
  CommunityProvider,
  sampleCommunityInitializerResponse,
} from "@entities/community";
import { samplePostListResponse } from "@entities/posts";
import * as AlertAPI from "@shared/lib/alert";
import { renderWithProviders } from "@test-utils/renderer";

/**
 * 커뮤니티 게시글 목록 페이지 테스트
 * 이 테스트 케이스에서는 Actual API를 사용한다
 */

describe("커뮤니티 게시글 목록 페이지", () => {
  const mockAxios = new MockAdapter(axios);

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    mockAxios.reset();
    mockAxios
      .onGet("/api/v1/community/initialize/")
      .reply(200, sampleCommunityInitializerResponse);
    mockAxios.onGet("/api/v1/posts/").reply(200, samplePostListResponse);
  });

  it("initialize api 오류", async () => {
    const showAlertMock = jest.fn();
    jest.spyOn(AlertAPI, "useAlert").mockReturnValue({
      showAlert: showAlertMock,
    });
    mockAxios.onGet("/api/v1/community/initialize/").reply(500);

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

  it("initialize api 오류: 데이터 없음", async () => {
    const showAlertMock = jest.fn();
    jest.spyOn(AlertAPI, "useAlert").mockReturnValue({
      showAlert: showAlertMock,
    });
    mockAxios
      .onGet("/api/v1/community/initialize/")
      .reply(200, { forums: [], profiles: [] });

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
    const { getAllByTestId, getByTestId } = await waitFor(() =>
      renderWithProviders(
        <CommunityProvider>
          <CommunityMain />
        </CommunityProvider>
      )
    );

    await waitFor(() => {
      expect(getByTestId("community-tab-text-덕아웃")).toBeTruthy();
      expect(getByTestId("community-tab-text-드래프트")).toBeTruthy();
      // 검색바, 태그 필터 있는지 확인
      expect(getAllByTestId("posts-searchbar")[0]).toBeTruthy();
      expect(getByTestId("tag-filter-KBO")).toBeTruthy();
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

    // 다시 덕아웃 탭으로 돌아가기
    fireEvent.press(getByTestId("community-tab-덕아웃"));

    // 태그 필터 적용 테스트
    fireEvent.press(getByTestId("tag-filter-KBO"));
    // 다시 눌러서 태그 필터 해제
    fireEvent.press(getByTestId("tag-filter-KBO"));

    // 게시글을 누르면 상세 페이지로 이동
    const postItem = getAllByTestId("post-1")[0];
    fireEvent.press(postItem);
    await waitFor(() => {
      expect(Router.router.push).toHaveBeenCalledWith("/community/posts/1");
    });

    // 새로고침 테스트
    const refreshControl = getAllByTestId("posts-list-scrollview")[0];
    refreshControl.props.refreshControl.props.onRefresh();
  });

  it("handles empty posts list", async () => {
    mockAxios.onGet("/api/v1/posts/").reply(200, { results: [] });
    const { getAllByText } = renderWithProviders(
      <CommunityProvider>
        <CommunityMain />
      </CommunityProvider>
    );

    await waitFor(() => {
      expect(getAllByText("게시글이 없습니다.")[0]).toBeTruthy();
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
