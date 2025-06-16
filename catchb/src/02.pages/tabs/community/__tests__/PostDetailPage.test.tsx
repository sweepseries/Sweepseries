import { waitFor } from "@testing-library/react-native";
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
  });

  it("renders post details correctly", async () => {
    const { getByText } = renderWithProviders(
      <CommunityTestWrapper>
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
