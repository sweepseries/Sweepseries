import { fireEvent, waitFor } from "@testing-library/react-native";
import * as Router from "expo-router";
import axios from "axios";

import { LoginPage } from "@pages/root/login";
import * as AlertAPI from "@shared/lib/alert";
import { sampleLoginData } from "@shared/lib/auth";
import { renderWithProviders } from "@test-utils/renderer";

describe("로그인 페이지", () => {
  const showAlertMock = jest.fn();

  beforeEach(() => {
    jest.restoreAllMocks();
    jest.spyOn(AlertAPI, "useAlert").mockReturnValue({
      showAlert: showAlertMock,
    });
  });

  it("돌아가기 버튼 누르면 시작 페이지로 이동", () => {
    const { getByTestId } = renderWithProviders(<LoginPage />);

    fireEvent.press(getByTestId("돌아가기"));
    expect(Router.router.back).toHaveBeenCalled();
  });

  it("아이디나 비밀번호 필드 중 하나라도 비어있다면, 에러 처리", async () => {
    const { getByTestId } = renderWithProviders(<LoginPage />);

    fireEvent.changeText(getByTestId("아이디"), "testuser");
    fireEvent.press(getByTestId("로그인"));

    await waitFor(() => {
      expect(showAlertMock).toHaveBeenCalledWith(
        expect.objectContaining({
          title: "로그인 실패",
          message: "아이디와 비밀번호를 입력해주세요.",
        })
      );
    });

    fireEvent.changeText(getByTestId("아이디"), "");
    fireEvent.changeText(getByTestId("비밀번호"), "testpassword");
    fireEvent.press(getByTestId("로그인"));

    await waitFor(() => {
      expect(showAlertMock).toHaveBeenCalledWith(
        expect.objectContaining({
          title: "로그인 실패",
          message: "아이디와 비밀번호를 입력해주세요.",
        })
      );
    });
  });

  it("로그인 요청 실패, alert 띄우기", async () => {
    jest.spyOn(axios, "post").mockRejectedValue({});

    const { getByTestId } = renderWithProviders(<LoginPage />);

    fireEvent.changeText(getByTestId("아이디"), "testuser");
    fireEvent.changeText(getByTestId("비밀번호"), "testpassword");
    fireEvent.press(getByTestId("로그인"));

    await waitFor(() => {
      expect(showAlertMock).toHaveBeenCalledWith(
        expect.objectContaining({
          title: "로그인 실패",
          message: "아이디와 비밀번호를 확인해주세요.",
        })
      );
    });
  });

  it("로그인 요청 성공, auth state를 업데이트하고, home으로 이동", async () => {
    jest.spyOn(axios, "post").mockResolvedValue({ data: sampleLoginData });

    const { getByTestId } = renderWithProviders(<LoginPage />);

    fireEvent.changeText(getByTestId("아이디"), "testuser");
    fireEvent.changeText(getByTestId("비밀번호"), "testpassword");

    // can dismiss
    fireEvent.press(getByTestId("로그인"));
    await waitFor(() => {
      expect(Router.router.replace).toHaveBeenCalledWith("/home");
    });

    // cannot dismiss
    jest.spyOn(Router.router, "canDismiss").mockReturnValue(false);
    fireEvent.press(getByTestId("로그인"));
    await waitFor(() => {
      expect(Router.router.replace).toHaveBeenCalledWith("/home");
    });
  });
});
