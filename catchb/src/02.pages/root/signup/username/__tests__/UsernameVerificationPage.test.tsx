import { fireEvent, waitFor } from "@testing-library/react-native";
import * as Router from "expo-router";
import axios from "axios";

import { UsernameEmailVerificationPage } from "@pages/root/signup";
import { SignupProvider } from "@shared/lib/signup";
import { renderWithProviders } from "@test-utils/renderer";

const renderPage = () => {
  return renderWithProviders(
    <SignupProvider>
      <UsernameEmailVerificationPage />
    </SignupProvider>
  );
};

describe("아이디 & 이메일 입력 페이지", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  it("유저에게 입력을 받고, 서버에 확인 요청", async () => {
    const { getByTestId, getByText } = renderPage();

    // 두 필드 모두 최소 1자 이상 입력해야 버튼 활성화
    expect(getByTestId("다음으로")).toBeDisabled();
    fireEvent.changeText(getByTestId("아이디"), "test");
    expect(getByTestId("다음으로")).toBeDisabled();
    fireEvent.changeText(getByTestId("이메일"), "email");
    expect(getByTestId("다음으로")).toBeEnabled();

    // 실패 1: 알 수 없는 오류
    jest.spyOn(axios, "post").mockRejectedValueOnce({});
    jest.spyOn(axios, "isAxiosError").mockReturnValueOnce(false);
    fireEvent.press(getByTestId("다음으로"));
    await waitFor(() => {
      expect(getByText("오류가 발생했습니다. 다시 시도해주세요.")).toBeTruthy();
    });

    // 실패 2: 알려지지 않은 오류
    jest.spyOn(axios, "post").mockRejectedValueOnce({
      response: { data: { error: "알 수 없는 오류" } },
    });
    jest.spyOn(axios, "isAxiosError").mockReturnValue(true);
    fireEvent.press(getByTestId("다음으로"));
    await waitFor(() => {
      expect(getByText("오류가 발생했습니다. 다시 시도해주세요.")).toBeTruthy();
    });

    // 실패 3: 이메일 오류
    jest.spyOn(axios, "post").mockRejectedValueOnce({
      response: { data: { error: "이메일 형식이 올바르지 않습니다." } },
    });
    fireEvent.press(getByTestId("다음으로"));
    await waitFor(() => {
      expect(getByText("이메일 형식이 올바르지 않습니다.")).toBeTruthy();
    });

    // 실패 4: 아이디 오류
    jest.spyOn(axios, "post").mockRejectedValueOnce({
      response: { data: { error: "이미 사용중인 아이디입니다." } },
    });
    fireEvent.press(getByTestId("다음으로"));
    await waitFor(() => {
      expect(getByText("이미 사용중인 아이디입니다.")).toBeTruthy();
    });

    // 성공
    jest.spyOn(axios, "post").mockResolvedValueOnce({});
    fireEvent.press(getByTestId("다음으로"));
    await waitFor(() => {
      expect(Router.router.push).toHaveBeenCalledWith("/signup/password");
    });
  });
});
