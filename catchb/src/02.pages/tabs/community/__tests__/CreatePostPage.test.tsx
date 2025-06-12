import { fireEvent, waitFor } from "@testing-library/react-native";
import * as ImagePicker from "expo-image-picker";
import * as Router from "expo-router";
import axios from "axios";

import { CreatePostPage } from "@pages/tabs/community";
import { CommunityTestWrapper } from "@entities/community";
import { samplePostDetail } from "@entities/posts";
import * as AlertAPI from "@shared/lib/alert";
import { renderWithProviders } from "@test-utils/renderer";

describe("CreatePostPage", () => {
  const showAlertMock = jest.fn();
  const sampleImageAsset = {
    uri: "test-image-uri",
    width: 100,
    height: 100,
    fileName: "test-image.jpg",
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    jest.spyOn(AlertAPI, "useAlert").mockReturnValue({
      showAlert: showAlertMock,
    });
  });

  it("renders and handles upload correctly", async () => {
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

    // test title input (too long)
    const titleInput = getByTestId("title-input");
    fireEvent.changeText(titleInput, "*".repeat(41)); // 41 characters
    await waitFor(() => {
      expect(getByText("41/40")).toBeTruthy();
    });

    // fill valid form
    fireEvent.changeText(titleInput, "제목");
    fireEvent.changeText(getByTestId("content-input"), "내용");

    // take photo
    jest.spyOn(ImagePicker, "launchCameraAsync").mockResolvedValue({
      canceled: false,
      assets: [sampleImageAsset],
    });
    fireEvent.press(getByTestId("image-select-button"));
    fireEvent.press(getByTestId("take-photo"));

    // select image
    jest.spyOn(ImagePicker, "launchImageLibraryAsync").mockResolvedValue({
      canceled: false,
      assets: [
        { ...sampleImageAsset, uri: "test-image-uri-2" },
        {
          ...sampleImageAsset,
          uri: "test-image-uri-3",
          fileName: "test-image2.jpg",
        },
      ],
    });
    fireEvent.press(getByTestId("image-select-button"));
    await waitFor(() => {
      expect(getByTestId("image-select-modal")).toBeTruthy();
    });
    fireEvent.press(getByTestId("close-modal"));
    fireEvent.press(getByTestId("image-select-button"));
    fireEvent.press(getByTestId("select-image"));
    await waitFor(() => {
      expect(getByTestId("test-image-uri-3-remove")).toBeTruthy();
    });

    // remove image
    fireEvent.press(getByTestId("test-image-uri-3-remove"));

    // 등록: 1회 실패: 알 수 없는 오류
    jest
      .spyOn(axios, "post")
      .mockRejectedValueOnce(new Error("알 수 없는 오류"));
    fireEvent.press(getByTestId("등록"));
    await waitFor(() => {
      expect(showAlertMock).toHaveBeenCalledWith(
        expect.objectContaining({
          title: "게시물 작성 실패",
          message: "알 수 없는 오류가 발생했습니다.",
        })
      );
    });

    // 등록: 2회 실패: 서버에서 오류 메시지 반환
    jest.spyOn(axios, "post").mockRejectedValueOnce({
      response: { data: { error: "서버 오류" } },
    });
    fireEvent.press(getByTestId("등록"));
    await waitFor(() => {
      expect(showAlertMock).toHaveBeenCalledWith(
        expect.objectContaining({
          title: "게시물 작성 실패",
          message: "서버 오류",
        })
      );
    });

    // 등록: 3회 성공
    jest.spyOn(axios, "post").mockResolvedValueOnce({
      data: samplePostDetail,
    });
    fireEvent.press(getByTestId("등록"));
    await waitFor(() => {
      expect(Router.router.replace).toHaveBeenCalledWith(
        `/community/posts/${samplePostDetail.id}`
      );
    });
  });

  it("handles login required alert", async () => {
    const { getByTestId } = renderWithProviders(
      <CommunityTestWrapper override={{ activeProfile: null }}>
        <CreatePostPage />
      </CommunityTestWrapper>
    );

    // image selector returns null
    jest.spyOn(ImagePicker, "launchImageLibraryAsync").mockResolvedValue({
      canceled: true,
      assets: null,
    });
    fireEvent.press(getByTestId("image-select-button"));
    fireEvent.press(getByTestId("select-image"));

    // camera returns null
    jest.spyOn(ImagePicker, "launchCameraAsync").mockResolvedValue({
      canceled: true,
      assets: null,
    });
    fireEvent.press(getByTestId("image-select-button"));
    fireEvent.press(getByTestId("take-photo"));

    // 로그인 필요 알림
    fireEvent.press(getByTestId("등록"));
    await waitFor(() => {
      expect(showAlertMock).toHaveBeenCalledWith(
        expect.objectContaining({
          title: "로그인이 필요합니다",
          message: "게시물을 작성하려면 로그인이 필요합니다.",
        })
      );
    });
  });
});
