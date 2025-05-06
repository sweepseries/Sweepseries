import { fireEvent, waitFor } from "@testing-library/react-native";
import * as Router from "expo-router";
import axios from "axios";

import { ProfileFormPage } from "@pages/root/signup";
import { SignupProvider } from "@features/signup/common";
import * as AlertAPI from "@shared/lib/alert";
import { renderWithProviders } from "@test-utils/renderer";

jest.unmock("@shared/ui/Selectors");

const renderPage = () => {
  return renderWithProviders(
    <SignupProvider>
      <ProfileFormPage />
    </SignupProvider>
  );
};

describe("프로필 입력 페이지", () => {
  const showAlertMock = jest.fn().mockImplementation((options) => {
    options.onConfirm?.();
  });

  beforeEach(() => {
    jest.useFakeTimers();
    jest.spyOn(AlertAPI, "useAlert").mockReturnValue({
      showAlert: showAlertMock,
    });
  });

  it("캐치비 모드 & 시작하기 버튼 & 회원가입 성공", async () => {
    jest.spyOn(Router, "useLocalSearchParams").mockReturnValueOnce({
      mode: "catchb",
    });

    const { getByTestId } = renderPage();

    // 초기 상태 확인
    expect(getByTestId("닉네임")).toHaveProp("value", "");
    expect(getByTestId("year")).toHaveProp("value", "");
    expect(getByTestId("month")).toHaveProp("value", "");
    expect(getByTestId("day")).toHaveProp("value", "");
    expect(getByTestId("시작하기")).toBeEnabled();
    expect(getByTestId("다음에")).toBeEnabled();
    expect(getByTestId("selected: 남성")).toBeTruthy();

    // 필드 입력
    fireEvent.changeText(getByTestId("닉네임"), "testuser");
    fireEvent.changeText(getByTestId("year"), "2000");
    fireEvent.changeText(getByTestId("month"), "01");
    fireEvent.changeText(getByTestId("day"), "01");
    fireEvent.press(getByTestId("여성"));

    // 시작하기 버튼 클릭
    jest.spyOn(axios, "post").mockResolvedValueOnce({});
    fireEvent.press(getByTestId("시작하기"));
    await waitFor(() => {
      expect(showAlertMock).toHaveBeenCalledWith(
        expect.objectContaining({
          title: "회원가입 완료",
          message: "회원가입이 완료되었습니다. 로그인 화면으로 이동합니다.",
        })
      );
      expect(Router.router.replace).toHaveBeenCalledWith("/login");
    });
  });

  it("네이버 모드 & 나중에 버튼 & 회원가입 실패 후 성공", async () => {
    jest.spyOn(Router, "useLocalSearchParams").mockReturnValue({
      mode: "naver",
      username: "testuser",
      email: "email@email.com",
      name: "홍길동",
      birthyear: "1990",
      birthday: "01-01",
      gender: "F",
      nickname: "nickname",
      profileImage: "profileImage",
    });

    const { getByTestId } = renderPage();

    // 초기 상태 확인
    expect(getByTestId("닉네임")).toHaveProp("value", "nickname");
    expect(getByTestId("year")).toHaveProp("value", "1990");
    expect(getByTestId("month")).toHaveProp("value", "01");
    expect(getByTestId("day")).toHaveProp("value", "01");
    expect(getByTestId("selected: 여성")).toBeTruthy();

    // clear nickname for coverage
    fireEvent.changeText(getByTestId("닉네임"), "");

    // 다음에 버튼 클릭: 실패: 알 수 없는 오류
    jest.spyOn(axios, "post").mockRejectedValueOnce({});
    jest.spyOn(axios, "isAxiosError").mockReturnValue(true);
    fireEvent.press(getByTestId("다음에"));
    await waitFor(() => {
      expect(showAlertMock).toHaveBeenCalledWith(
        expect.objectContaining({
          title: "오류",
          message: "오류가 발생했습니다. 다시 시도해주세요.",
        })
      );
    });

    // 다음에 버튼 클릭: 실패: 회원가입 오류
    jest.spyOn(axios, "post").mockRejectedValueOnce({
      response: { data: { error: "회원가입 중 오류가 발생했습니다." } },
    });
    jest.spyOn(axios, "isAxiosError").mockReturnValue(true);
    fireEvent.press(getByTestId("다음에"));
    await waitFor(() => {
      expect(showAlertMock).toHaveBeenCalledWith(
        expect.objectContaining({
          title: "오류",
          message: "회원가입 중 오류가 발생했습니다.",
        })
      );
    });

    // 다음에 버튼 클릭: 성공
    jest.spyOn(axios, "post").mockResolvedValueOnce({});
    fireEvent.press(getByTestId("다음에"));
    await waitFor(() => {
      expect(showAlertMock).toHaveBeenCalledWith(
        expect.objectContaining({
          title: "회원가입 완료",
          message: "회원가입이 완료되었습니다. 로그인 화면으로 이동합니다.",
        })
      );
      expect(Router.router.replace).toHaveBeenCalledWith("/");
    });
  });

  it("카카오 모드 & 초기 값 없음", async () => {
    jest.spyOn(Router, "useLocalSearchParams").mockReturnValue({
      mode: "kakao",
      username: "testuser",
      email: "email@email.com",
      name: "홍길동",
    });

    const { getByTestId } = renderPage();

    // 초기 상태 확인
    expect(getByTestId("닉네임")).toHaveProp("value", "");
  });
});
