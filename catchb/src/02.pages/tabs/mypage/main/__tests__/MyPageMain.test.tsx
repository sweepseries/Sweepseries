import { fireEvent, waitFor } from "@testing-library/react-native";
import * as Linking from "expo-linking";
import * as Router from "expo-router";
import axios from "axios";

import { MyPageMain } from "@pages/tabs/mypage";
import * as AuthAPI from "@shared/lib/auth";
import * as AlertAPI from "@shared/lib/alert";
import * as Storage from "@shared/lib/storage";
import { renderWithProviders } from "@test-utils/renderer";

jest.mock("expo-linking", () => ({
  openURL: jest.fn(),
}));

describe("마이페이지 메인", () => {
  const showAlertMock = jest.fn().mockImplementation((options) => {
    options.onConfirm?.();
  });

  beforeEach(() => {
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
    jest.spyOn(Storage, "getSecure").mockResolvedValue("refreshToken");
  });

  it("비회원", async () => {
    jest.spyOn(AuthAPI, "useAuth").mockReturnValue({
      saveLoginStatus: jest.fn(),
      resetLoginStatus: jest.fn(),
      user: null,
      mode: "GUEST",
      isAuthenticated: false,
    });

    const { queryByTestId } = renderWithProviders(<MyPageMain />);

    expect(queryByTestId("로그아웃-button")).toBeFalsy();
    expect(queryByTestId("회원탈퇴-button")).toBeFalsy();
  });

  it("로그아웃", async () => {
    const { getByText } = renderWithProviders(<MyPageMain />);

    expect(getByText("로그아웃")).toBeTruthy();

    // 실패하면 오류 메시지를 띄운다
    jest.spyOn(axios, "post").mockRejectedValueOnce(new Error("로그아웃 실패"));
    fireEvent.press(getByText("로그아웃"));

    // 성공하면, 토큰을 지우고 "/"로 이동
    jest.spyOn(axios, "post").mockResolvedValue({});
    await waitFor(() => {
      fireEvent.press(getByText("로그아웃"));
    });
    expect(Router.router.replace).toHaveBeenCalledWith("/");

    // 한번더 with no dismiss (Just for coverage)
    jest.spyOn(Router.router, "canDismiss").mockReturnValue(false);
    await waitFor(() => {
      fireEvent.press(getByText("로그아웃"));
    });
  });

  it("회원탈퇴", async () => {
    const { getByTestId, getByText } = renderWithProviders(<MyPageMain />);

    expect(getByTestId("회원탈퇴-button")).toBeTruthy();

    fireEvent.press(getByTestId("회원탈퇴-button"));
    expect(
      getByText(
        " \u2022 회원 탈퇴 시, 즉시 탈퇴 처리가 되며 향후 재가입은 가능합니다."
      )
    ).toBeTruthy();

    // 1회 취소
    fireEvent.press(getByTestId("돌아가기"));

    fireEvent.press(getByTestId("회원탈퇴-button"));
    fireEvent.press(getByTestId("탈퇴하기"));

    expect(Router.router.push).toHaveBeenCalledWith("/mypage/withdraw");
  });

  it("개인정보 처리 방침 & 이용약관", () => {
    const { getByText } = renderWithProviders(<MyPageMain />);

    expect(getByText("개인정보 처리방침")).toBeTruthy();
    expect(getByText("이용약관")).toBeTruthy();

    fireEvent.press(getByText("개인정보 처리방침"));
    expect(Linking.openURL).toHaveBeenCalledWith(
      "https://www.sweepseries.com/privacy-policy"
    );

    fireEvent.press(getByText("이용약관"));
    expect(Linking.openURL).toHaveBeenCalledWith(
      "https://www.sweepseries.com/terms-of-service"
    );
  });

  it("고객센터 및 설정", () => {
    const { getByText } = renderWithProviders(<MyPageMain />);

    expect(getByText("공지사항")).toBeTruthy();

    fireEvent.press(getByText("공지사항"));
    expect(Router.router.push).toHaveBeenCalledWith("/mypage/announcements");
  });
});
