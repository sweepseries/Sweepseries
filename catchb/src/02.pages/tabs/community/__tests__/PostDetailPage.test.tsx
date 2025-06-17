import { fireEvent, waitFor } from "@testing-library/react-native";
import * as Router from "expo-router";
import axios from "axios";

import { PostDetailsPage } from "@pages/tabs/community";
import { CommunityTestWrapper } from "@entities/community";
import { samplePostDetail } from "@entities/posts";
import * as AlertAPI from "@shared/lib/alert";
import { renderWithProviders } from "@test-utils/renderer";

describe("PostDetailsPage", () => {
  const showAlertMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    jest.spyOn(AlertAPI, "useAlert").mockReturnValue({
      showAlert: showAlertMock,
    });
    jest.spyOn(Router, "useLocalSearchParams").mockReturnValue({ id: "1" });
    jest.spyOn(axios, "get").mockResolvedValue({ data: samplePostDetail });
    jest.spyOn(axios, "isAxiosError").mockReturnValue(true);
  });

  it("renders post details and handles like correctly", async () => {
    const { getByTestId, getByText } = renderWithProviders(
      <CommunityTestWrapper>
        <PostDetailsPage />
      </CommunityTestWrapper>
    );

    await waitFor(() => {
      expect(getByText(samplePostDetail.title)).toBeTruthy();
      expect(getByText(samplePostDetail.content)).toBeTruthy();
    });

    // 1회: 실패 - 알 수 없는 오류
    jest.spyOn(axios, "post").mockRejectedValueOnce(new Error("Unknown error"));
    fireEvent.press(getByTestId("like-button"));

    await waitFor(() => {
      expect(showAlertMock).toHaveBeenCalledWith({
        title: "오류 발생",
        message: "알 수 없는 오류가 발생했습니다. 다시 시도해주세요.",
      });
    });

    // 2회 성공
    jest.spyOn(axios, "post").mockResolvedValue({});
    fireEvent.press(getByTestId("like-button"));
  });

  it("renders liked post details and handles un-like", async () => {
    jest
      .spyOn(axios, "get")
      .mockResolvedValue({ data: { ...samplePostDetail, is_liked: true } });

    const { getByTestId } = renderWithProviders(
      <CommunityTestWrapper>
        <PostDetailsPage />
      </CommunityTestWrapper>
    );

    await waitFor(() => {
      expect(getByTestId("like-button")).toBeTruthy();
    });

    // 1회 실패: API 오류
    jest
      .spyOn(axios, "post")
      .mockRejectedValueOnce({ response: { data: { error: "API Error" } } });
    fireEvent.press(getByTestId("like-button"));

    await waitFor(() => {
      expect(showAlertMock).toHaveBeenCalledWith({
        title: "오류 발생",
        message: "API Error",
      });
    });
  });

  it("renders post details for unauthenticated user", async () => {
    const { getByText } = renderWithProviders(
      <CommunityTestWrapper override={{ activeProfile: null }}>
        <PostDetailsPage />
      </CommunityTestWrapper>
    );

    await waitFor(() => {
      expect(getByText(samplePostDetail.title)).toBeTruthy();
      expect(getByText(samplePostDetail.content)).toBeTruthy();
    });
  });

  it("handles api error", async () => {
    jest.spyOn(axios, "get").mockRejectedValue(new Error("API Error"));

    renderWithProviders(
      <CommunityTestWrapper>
        <PostDetailsPage />
      </CommunityTestWrapper>
    );

    await waitFor(() => {
      expect(showAlertMock).toHaveBeenCalledWith({
        title: "오류 발생",
        message: "게시글을 불러오는 데 실패했습니다.",
      });
    });
  });

  it("handles bad param", async () => {
    jest.spyOn(AlertAPI, "useAlert").mockReturnValue({
      showAlert: showAlertMock,
    });
    jest
      .spyOn(Router, "useLocalSearchParams")
      .mockReturnValue({ id: "bad-id" });

    renderWithProviders(
      <CommunityTestWrapper>
        <PostDetailsPage />
      </CommunityTestWrapper>
    );

    await waitFor(() => {
      expect(showAlertMock).toHaveBeenCalledWith({
        title: "오류 발생",
        message: "게시글을 찾을 수 없습니다.",
      });
    });
  });
});
