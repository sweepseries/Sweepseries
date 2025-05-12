import { fireEvent, screen, waitFor } from "@testing-library/react-native";
import * as Router from "expo-router";
import axios from "axios";

import { PhoneNumberVerificationPage } from "@pages/root/signup";
import * as AlertAPI from "@shared/lib/alert";
import { SignupProvider } from "@shared/lib/signup";
import { renderWithProviders } from "@test-utils/renderer";

const renderPage = () => {
  return renderWithProviders(
    <SignupProvider>
      <PhoneNumberVerificationPage />
    </SignupProvider>
  );
};

describe("이름 입력 & 전화번호 인증 페이지", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  it("캐치비 모드 & 인증 성공", async () => {
    const showAlertMock = jest.fn();
    jest.spyOn(Router, "useLocalSearchParams").mockReturnValueOnce({
      mode: "catchb",
    });
    jest.spyOn(AlertAPI, "useAlert").mockReturnValue({
      showAlert: showAlertMock,
    });

    const { getByPlaceholderText, getByTestId, getByText } = renderPage();

    // 초기 상태 확인
    expect(getByTestId("이름")).toHaveProp("value", "");
    expect(getByTestId("인증번호 전송")).toBeDisabled();
    expect(screen.queryByTestId("인증하기")).toBeNull();
    expect(getByTestId("회원가입")).toBeDisabled();

    // 필드 입력
    fireEvent.changeText(getByTestId("이름"), "홍길동");
    fireEvent.changeText(getByTestId("middle-number"), "1234");
    // 하나라도 4자리가 아니면, 인증번호 전송 버튼 비활성화
    fireEvent.changeText(getByTestId("last-number"), "56");
    expect(getByTestId("인증번호 전송")).toBeDisabled();
    fireEvent.changeText(getByTestId("last-number"), "5678");

    // 인증번호 전송 버튼 활성화 확인
    jest.spyOn(axios, "post").mockResolvedValueOnce({});
    expect(getByTestId("인증번호 전송")).toBeEnabled();
    fireEvent.press(getByTestId("인증번호 전송"));

    await waitFor(() => {
      expect(getByTestId("middle-number")).toHaveProp("editable", false);
      expect(getByTestId("last-number")).toHaveProp("editable", false);
      expect(getByTestId("재발송 (3:00)")).toBeDisabled();
      expect(getByText("인증번호")).toBeTruthy();
      expect(getByTestId("인증하기")).toBeTruthy();
      expect(getByTestId("인증하기")).toBeDisabled();
    });

    // 인증번호 입력
    // 6자리가 아니면 인증하기 버튼 비활성화
    fireEvent.changeText(
      getByPlaceholderText("인증번호를 입력해주세요."),
      "56"
    );
    expect(getByTestId("인증하기")).toBeDisabled();
    fireEvent.changeText(
      getByPlaceholderText("인증번호를 입력해주세요."),
      "12345678"
    );
    expect(getByTestId("인증하기")).toBeDisabled();
    fireEvent.changeText(
      getByPlaceholderText("인증번호를 입력해주세요."),
      "123456"
    );
    expect(getByTestId("인증하기")).toBeEnabled();

    // 인증하기 버튼 클릭
    jest.spyOn(axios, "post").mockResolvedValueOnce({});
    fireEvent.press(getByTestId("인증하기"));

    await waitFor(() => {
      expect(showAlertMock).toHaveBeenCalledWith(
        expect.objectContaining({
          title: "인증 성공",
          message: "전화번호 인증이 완료되었습니다.",
        })
      );
      expect(getByTestId("회원가입")).toBeEnabled();
    });
    fireEvent.press(getByTestId("회원가입"));

    await waitFor(() => {
      expect(getByTestId("재발송 (3:00)")).toBeDisabled();
      expect(getByTestId("인증하기")).toBeDisabled();
      expect(Router.router.push).toHaveBeenCalledWith("/signup/profile");
    });
  });

  it("네이버 모드 (full initial profile) & 인증 실패", async () => {
    jest.spyOn(Router, "useLocalSearchParams").mockReturnValueOnce({
      mode: "naver",
      username: "testuser",
      email: "email@email.com",
      name: "홍길동",
      birthyear: "1990",
      birthday: "0101",
      gender: "M",
      nickname: "nickname",
      profileImage: "profileImage",
    });

    const { getByPlaceholderText, getByTestId, getByText } = renderPage();

    // 초기 상태 확인
    expect(getByTestId("이름")).toHaveProp("value", "홍길동");

    // 필드 입력 (이름도 수정할 수 있어야 한다)
    fireEvent.changeText(getByTestId("이름"), "김철수");
    expect(getByTestId("이름")).toHaveProp("value", "김철수");
    fireEvent.changeText(getByTestId("middle-number"), "1234");
    fireEvent.changeText(getByTestId("last-number"), "5678");

    // 인증번호 전송 1회 실패 후 성공
    jest.spyOn(axios, "post").mockRejectedValueOnce({}); // 인증번호 전송 실패: 알 수 없는 오류
    fireEvent.press(getByTestId("인증번호 전송"));
    await waitFor(() => {
      expect(getByTestId("인증번호 전송")).toBeEnabled();
      expect(getByText("오류가 발생했습니다. 다시 시도해주세요.")).toBeTruthy();
    });

    jest.spyOn(axios, "post").mockResolvedValueOnce({});
    fireEvent.press(getByTestId("인증번호 전송"));
    await waitFor(() => {
      expect(getByTestId("인증하기")).toBeDisabled();
    });

    // 전화번호 인증 실패: 인증번호 불일치
    fireEvent.changeText(
      getByPlaceholderText("인증번호를 입력해주세요."),
      "123456"
    );
    expect(getByTestId("인증하기")).toBeEnabled();
    jest.spyOn(axios, "post").mockRejectedValueOnce({
      response: { data: { error: "인증번호가 일치하지 않습니다." } },
    });
    jest.spyOn(axios, "isAxiosError").mockReturnValue(true);
    fireEvent.press(getByTestId("인증하기"));
    await waitFor(() => {
      expect(getByText("인증번호가 일치하지 않습니다.")).toBeTruthy();
      expect(getByTestId("회원가입")).toBeDisabled();
    });
  });

  it("네이버 모드 (partial initial profile) & 인증 실패", async () => {
    jest.spyOn(Router, "useLocalSearchParams").mockReturnValueOnce({
      mode: "naver",
      username: "testuser",
      email: "email@email.com",
      name: "홍길동",
      gender: "F",
    });

    const { getByTestId, getByText } = renderPage();

    // 초기 상태 확인
    expect(getByTestId("이름")).toHaveProp("value", "홍길동");

    // 필드 입력
    fireEvent.changeText(getByTestId("middle-number"), "1234");
    fireEvent.changeText(getByTestId("last-number"), "5678");

    // 인증번호 전송 1회 실패 후 성공
    jest.spyOn(axios, "post").mockRejectedValueOnce({
      response: { data: { error: "인증번호 전송에 실패했습니다." } },
    }); // 인증번호 전송 실패
    fireEvent.press(getByTestId("인증번호 전송"));
    await waitFor(() => {
      expect(getByTestId("인증번호 전송")).toBeEnabled();
      expect(getByText("인증번호 전송에 실패했습니다.")).toBeTruthy();
    });
  });

  it("카카오 모드 (full initial profile) & 인증 실패", async () => {
    jest.spyOn(Router, "useLocalSearchParams").mockReturnValueOnce({
      mode: "kakao",
      username: "testuser",
      email: "email@email.com",
      name: "홍길동",
      birthyear: "1990",
      birthday: "0101",
      gender: "male",
      nickname: "nickname",
      profileImage: "profileImage",
    });

    const { getByPlaceholderText, getByTestId, getByText } = renderPage();

    // 초기 상태 확인
    expect(getByTestId("이름")).toHaveProp("value", "");

    // 필드 입력
    fireEvent.changeText(getByTestId("middle-number"), "1234");
    fireEvent.changeText(getByTestId("last-number"), "5678");

    // 인증번호 전송 성공
    jest.spyOn(axios, "post").mockResolvedValueOnce({});
    fireEvent.press(getByTestId("인증번호 전송"));
    await waitFor(() => {
      expect(getByText("인증번호")).toBeTruthy();
    });

    // 인증번호 확인 요청 실패: 알 수 없는 오류
    jest.spyOn(axios, "post").mockRejectedValueOnce({});
    fireEvent.changeText(
      getByPlaceholderText("인증번호를 입력해주세요."),
      "123456"
    );
    fireEvent.press(getByTestId("인증하기"));
    await waitFor(() => {
      expect(getByText("오류가 발생했습니다. 다시 시도해주세요.")).toBeTruthy();
    });

    // 3분 지나 인증하기 버튼 비활성화 & 인증번호 전송 버튼 활성화
    await waitFor(() => {
      jest.advanceTimersByTime(180000);
    });
    expect(getByTestId("인증하기")).toBeDisabled();
    expect(getByTestId("인증번호 전송")).toBeEnabled();
  });

  it("카카오 모드 partial initial profile)", async () => {
    jest.spyOn(Router, "useLocalSearchParams").mockReturnValueOnce({
      mode: "kakao",
      username: "testuser",
      email: "email@email.com",
      name: "홍길동",
      gender: "female",
    });

    renderPage();
  });
});
