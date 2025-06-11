import { act, fireEvent, waitFor } from "@testing-library/react-native";
import * as Router from "expo-router";
import axios from "axios";

import { WithdrawPage } from "@pages/tabs/mypage";
import * as AuthAPI from "@shared/lib/auth";
import * as AlertAPI from "@shared/lib/alert";
import { renderWithProviders } from "@test-utils/renderer";

describe("회원탈퇴 페이지", () => {
  const showAlertMock = jest.fn().mockImplementation((options) => {
    options.onConfirm?.();
  });

  beforeEach(() => {
    jest.useFakeTimers();
    jest.spyOn(AuthAPI, "useAuth").mockReturnValue({
      saveLoginStatus: jest.fn(),
      resetLoginStatus: jest.fn(),
      user: AuthAPI.sampleLoginData.user,
      mode: "NORMAL",
      isAuthenticated: true,
    });
    jest.spyOn(AlertAPI, "useAlert").mockReturnValue({
      showAlert: showAlertMock,
    });
  });

  it("사유 선택 토글 & 직접 작성을 누르면 TextInput & 탈퇴처리", async () => {
    const { getByTestId, getByText, queryByTestId } = renderWithProviders(
      <WithdrawPage />
    );

    expect(getByText("예약 내역 등의 기록을 삭제하고 싶어요")).toBeTruthy();
    expect(getByText("직접 작성")).toBeTruthy();
    expect(queryByTestId("custom-reason-input")).toBeFalsy();

    // 사유 선택 토글
    fireEvent.press(getByText("예약 내역 등의 기록을 삭제하고 싶어요"));
    fireEvent.press(getByText("개인정보 유출이 걱정돼요"));
    expect(queryByTestId("custom-reason-input")).toBeFalsy();

    // 직접 작성
    fireEvent.press(getByText("직접 작성"));
    expect(getByTestId("탈퇴하기")).toBeDisabled();
    const textInput = getByTestId("custom-reason-input");
    expect(textInput).toBeTruthy();
    act(() => {
      textInput.props.onFocus();
      jest.advanceTimersByTime(1000);
    });
    fireEvent.changeText(textInput, "사유를 입력합니다...");
    expect(getByTestId("탈퇴하기")).toBeEnabled();

    // 탈퇴하기 버튼 클릭
    jest.spyOn(axios, "post").mockResolvedValue({});
    await waitFor(() => {
      fireEvent.press(getByTestId("탈퇴하기"));
    });
    expect(Router.router.replace).toHaveBeenCalledWith("/");
  });

  it("탈퇴 실패 (서버 오류)", async () => {
    const { getByTestId } = renderWithProviders(<WithdrawPage />);

    // 탈퇴하기 버튼 클릭
    jest.spyOn(axios, "post").mockRejectedValue({});
    await waitFor(() => {
      fireEvent.press(getByTestId("탈퇴하기"));
    });
    expect(showAlertMock).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "오류",
        message: "오류가 발생했습니다. 다시 시도해주세요.",
      })
    );
  });
});
