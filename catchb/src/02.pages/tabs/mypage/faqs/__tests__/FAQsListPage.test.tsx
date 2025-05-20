import { fireEvent, waitFor } from "@testing-library/react-native";
import * as Router from "expo-router";
import axios from "axios";

import { FAQsPage } from "@pages/tabs/mypage";
import { sampleFAQResponse } from "@entities/faqs";
import * as AlertAPI from "@shared/lib/alert";
import { renderWithProviders } from "@test-utils/renderer";

describe("자주 묻는 질문 목록 페이지", () => {
  const showAlertMock = jest.fn().mockImplementation((options) => {
    options.onConfirm?.();
  });

  beforeEach(() => {
    jest.useFakeTimers();
    jest.spyOn(AlertAPI, "useAlert").mockReturnValue({
      showAlert: showAlertMock,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("FAQ 목록을 가져오는데 실패하면, 오류 메시지를 보여주고 이전 페이지로 돌아간다", async () => {
    jest.spyOn(axios, "get").mockRejectedValue(new Error());

    renderWithProviders(<FAQsPage />);

    await waitFor(() => {
      expect(showAlertMock).toHaveBeenCalledWith(
        expect.objectContaining({
          title: "오류 발생",
          message: "FAQ를 불러오는 데 실패했습니다. 잠시 후 다시 시도해주세요.",
        })
      );
      expect(Router.router.back).toHaveBeenCalled();
    });
  });

  it("FAQ 목록을 가져오는데 성공하면, 카테고리와 FAQ 목록을 보여준다", async () => {
    jest.spyOn(axios, "get").mockResolvedValue({
      data: sampleFAQResponse,
    });

    const { getByText, queryByText } = renderWithProviders(<FAQsPage />);

    // FAQ 목록을 가져오는 동안 로딩 화면을 보여준다
    expect(getByText("Loading Item")).toBeTruthy();

    await waitFor(() => {
      expect(getByText("전체")).toBeTruthy();
      expect(getByText("일반")).toBeTruthy();
      expect(getByText("기술")).toBeTruthy();
      expect(
        getByText("[General] What is the purpose of this app?")
      ).toBeTruthy();
      expect(
        queryByText(
          "This app is designed to help users manage their tasks efficiently."
        )
      ).toBeFalsy();
      expect(getByText("[Technical] Why is the app crashing?")).toBeTruthy();
      expect(
        queryByText(
          "The app may crash due to a variety of reasons. Please check your internet connection and try again."
        )
      ).toBeFalsy();
    });

    // 카테고리 클릭 시 FAQ 목록이 변경되는지 확인
    fireEvent.press(getByText("일반"));
    expect(queryByText("[Technical] Why is the app crashing?")).toBeFalsy();

    // FAQ 클릭 시 답변이 보여지는지 확인
    fireEvent.press(getByText("[General] What is the purpose of this app?"));
    await waitFor(() => {
      expect(
        getByText(
          "This app is designed to help users manage their tasks efficiently."
        )
      ).toBeTruthy();
    });

    // 다른 FAQ 클릭 시 이전 FAQ의 답변이 사라지는지 확인
    fireEvent.press(getByText("[General] How do I reset my password?"));
    await waitFor(() => {
      expect(
        queryByText(
          "This app is designed to help users manage their tasks efficiently."
        )
      ).toBeFalsy();
      expect(
        getByText(
          "You can reset your password by going to the settings page and clicking on 'Reset Password'."
        )
      ).toBeTruthy();
    });

    // 다시 눌러 collapse 되는지 확인
    fireEvent.press(getByText("[General] How do I reset my password?"));
    await waitFor(() => {
      expect(
        queryByText(
          "You can reset your password by going to the settings page and clicking on 'Reset Password'."
        )
      ).toBeFalsy();
    });
  });
});
