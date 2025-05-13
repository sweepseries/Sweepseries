import { fireEvent, screen, waitFor } from "@testing-library/react-native";
import * as Router from "expo-router";
import axios from "axios";

import { TermsListPage } from "@pages/root/signup";
import { sampleTerms } from "@entities/terms";
import * as AlertAPI from "@shared/lib/alert";
import { SignupProvider } from "@shared/lib/signup";
import { queryClient, renderWithProviders } from "@test-utils/renderer";

const renderPage = () => {
  return renderWithProviders(
    <SignupProvider>
      <TermsListPage />
    </SignupProvider>
  );
};

describe("약관 목록 페이지", () => {
  const showAlertMock = jest.fn().mockImplementation((options) => {
    options.onConfirm?.();
  });

  beforeEach(() => {
    jest.useFakeTimers();
    jest.spyOn(AlertAPI, "useAlert").mockReturnValue({
      showAlert: showAlertMock,
    });
    jest.spyOn(axios, "get").mockResolvedValue({ data: sampleTerms });
    jest.spyOn(Router, "useLocalSearchParams").mockReturnValue({
      mode: "catchb",
    });

    queryClient.clear();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("약관 목록을 가져오지 못하면 오류 메시지를 보여주고 이전 페이지로 돌아간다", async () => {
    jest
      .spyOn(axios, "get")
      .mockRejectedValue(new Error("약관 목록을 가져오지 못했습니다."));

    renderPage();

    await waitFor(() => {
      expect(showAlertMock).toHaveBeenCalledWith(
        expect.objectContaining({
          title: "오류 발생",
          message:
            "약관 목록을 불러오는 중 오류가 발생했습니다. 다시 시도해주세요.",
        })
      );
      expect(Router.router.back).toHaveBeenCalled();
    });
  });

  it("성공하면 화면에 목록을 보여준다 1: catchb 모드", async () => {
    const { getByTestId, getByText } = renderPage();

    // 약관 목록을 가져오는 동안 로딩 화면을 보여준다
    expect(getByText("Loading Item")).toBeTruthy();

    // 약관 목록을 화면에 보여준다
    await waitFor(() => {
      expect(getByText("Catch B 약관에 동의해주세요!")).toBeTruthy();
      expect(getByText("(필수) Required Terms and Conditions")).toBeTruthy();
      expect(
        getByText("(필수) Required Terms and Conditions without content")
      ).toBeTruthy();
      expect(getByText("(선택) 알림 수신 동의")).toBeTruthy();
    });

    // 내용이 있으면 상세 페이지로 이동할 수 있는 버튼을 보여주고
    expect(getByTestId("right-1")).toBeTruthy();
    expect(getByTestId("right-2")).toBeTruthy();
    // 내용이 없으면 버튼을 부여하지 않는다
    expect(screen.queryByTestId("right-3")).toBeNull();

    // 약관의 오른쪽 화살표를 누르면 상세 페이지로 이동한다
    fireEvent.press(getByTestId("right-1"));
    expect(Router.router.push).toHaveBeenCalledWith("/signup/terms/1");

    // 약관을 누르면 check를 토글하고, 필수 약관이 모두 체크되면 다음 버튼이 활성화된다
    fireEvent.press(getByTestId("term-1")); // 필수 약관 (1/2)
    fireEvent.press(getByTestId("다음으로"));
    expect(Router.router.push).not.toHaveBeenCalledWith("/signup/username");
    fireEvent.press(getByTestId("term-3")); // 선택 약관. 아무런 영향이 없다
    fireEvent.press(getByTestId("다음으로"));
    expect(Router.router.push).not.toHaveBeenCalledWith("/signup/username");
    fireEvent.press(getByTestId("term-2")); // 필수 약관 (2/2)
    fireEvent.press(getByTestId("다음으로"));
    expect(Router.router.push).toHaveBeenCalledWith("/signup/username");
  });

  it("성공하면 화면에 목록을 보여준다 2: social 모드", async () => {
    jest.spyOn(Router, "useLocalSearchParams").mockReturnValue({
      mode: "naver",
    });

    const checkIfAllChecked = () => {
      expect(getByTestId("term-1-checked")).toBeTruthy();
      expect(getByTestId("term-2-checked")).toBeTruthy();
      expect(getByTestId("term-3-checked")).toBeTruthy();
    };

    const checkIfAllNotChecked = () => {
      expect(screen.queryByTestId("term-1-checked")).toBeNull();
      expect(screen.queryByTestId("term-2-checked")).toBeNull();
      expect(screen.queryByTestId("term-3-checked")).toBeNull();
    };

    const { getByTestId, getByText } = renderPage();

    await waitFor(() => {
      expect(getByText("Catch B 약관에 동의해주세요!")).toBeTruthy();
    });

    const checkAllButton = getByTestId("toggle-all");

    // ‘모두 동의합니다’를 누르면, 모든 약관이 체크되어 있으면 모두 체크 해제하고, 아니면 모두 체크한다.
    // 체크가 되어 있으면 term-id-isactive가 존재한다
    // 일단 초기 상태는 모두 체크 해제
    checkIfAllNotChecked();

    // 모두 동의합니다를 누르면 모든 약관이 체크된다
    fireEvent.press(checkAllButton);
    checkIfAllChecked();

    // 모든 약관이 체크된 상태에서 모두 동의합니다를 누르면 모든 약관이 체크 해제된다
    fireEvent.press(checkAllButton);
    checkIfAllNotChecked();

    // 일부만 체크되어 있는 상태에서 모두 동의합니다를 눌러도 모든 약관이 체크된다
    fireEvent.press(getByTestId("term-1"));
    fireEvent.press(checkAllButton);
    checkIfAllChecked();

    // 다음 버튼을 누르면, 전화번호 인증 페이지로 이동한다
    fireEvent.press(getByTestId("다음으로"));
    expect(Router.router.push).toHaveBeenCalledWith("/signup/phone");
  });
});
