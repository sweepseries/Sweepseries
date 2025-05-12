import { fireEvent, waitFor } from "@testing-library/react-native";
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
      user: null,
      mode: "GUEST",
      isAuthenticated: false,
    });
    jest.spyOn(AlertAPI, "useAlert").mockReturnValue({
      showAlert: showAlertMock,
    });
  });

  it("bad config (for coverage only)", async () => {
    const { getByTestId } = renderWithProviders(<WithdrawPage />);

    // 탈퇴하기 버튼 클릭
    jest.spyOn(axios, "post").mockResolvedValue({});
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
