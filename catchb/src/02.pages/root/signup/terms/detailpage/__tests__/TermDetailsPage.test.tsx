import { fireEvent, waitFor } from "@testing-library/react-native";
import * as Router from "expo-router";
import axios from "axios";

import { TermsContentPage } from "@pages/root/signup/";
import { sampleTerms } from "@entities/terms";
import * as AlertAPI from "@shared/lib/alert";
import { renderWithProviders } from "@test-utils/renderer";

describe("약관 상세 페이지", () => {
  const showAlertMock = jest.fn().mockImplementation((options) => {
    options.onConfirm?.();
  });

  beforeEach(() => {
    jest.useFakeTimers();
    jest.spyOn(Router, "useLocalSearchParams").mockReturnValue({
      id: "1",
    });
    jest.spyOn(AlertAPI, "useAlert").mockReturnValue({
      showAlert: showAlertMock,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("약관 ID가 없으면 오류 메시지를 보여주고 이전 페이지로 돌아간다", async () => {
    jest.spyOn(Router, "useLocalSearchParams").mockReturnValueOnce({});

    renderWithProviders(<TermsContentPage />);

    await waitFor(() => {
      expect(showAlertMock).toHaveBeenCalledWith(
        expect.objectContaining({
          title: "오류 발생",
          message: "약관을 로드하는 중 오류가 발생했습니다. 다시 시도해주세요.",
        })
      );
      expect(Router.router.back).toHaveBeenCalled();
    });
  });

  it("약관 정보를 가져오지 못하면 오류 메시지를 보여주고 이전 페이지로 돌아간다", async () => {
    jest.spyOn(axios, "get").mockRejectedValue(new Error("API Error"));

    renderWithProviders(<TermsContentPage />);

    await waitFor(() => {
      expect(Router.router.back).toHaveBeenCalled();
      expect(showAlertMock).toHaveBeenCalledWith(
        expect.objectContaining({
          title: "오류 발생",
          message: "약관을 로드하는 중 오류가 발생했습니다. 다시 시도해주세요.",
        })
      );
    });
  });

  it("정보를 불러오는 동안 로딩 화면을 보여주고, 불러오는데 성공하면 정보를 화면에 보여준다", async () => {
    jest.spyOn(axios, "get").mockResolvedValue({
      data: sampleTerms[0],
    });

    const { getByTestId, getByText } = renderWithProviders(
      <TermsContentPage />
    );

    expect(getByText("Loading Item")).toBeTruthy();

    await waitFor(() => {
      expect(getByText("Required Terms and Conditions")).toBeTruthy();
    });
    fireEvent.press(getByTestId("닫기"));
    expect(Router.router.back).toHaveBeenCalled();
  });
});
