import { fireEvent, waitFor } from "@testing-library/react-native";
import * as Router from "expo-router";
import axios from "axios";

import { PasswordVerificationPage } from "@pages/root/signup";
import { SignupProvider } from "@shared/lib/signup";
import { renderWithProviders } from "@test-utils/renderer";

const renderPage = () => {
  return renderWithProviders(
    <SignupProvider>
      <PasswordVerificationPage />
    </SignupProvider>
  );
};

describe("비밀번호 확인 페이지", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.spyOn(axios, "post").mockResolvedValue({});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("비밀번호 입력을 받고, 다음으로 버튼을 눌러 서버에 확인 요청 (실패 with 에러 메시지)", async () => {
    const { getByTestId, getByText } = renderPage();

    // 각 비밀번호 필드에 최소 1자 이상의 입력을 받아야만 버튼이 활성화 된다.
    expect(getByTestId("다음으로")).toBeDisabled(); // 초기 버튼 비활성화 상태

    fireEvent.changeText(getByTestId("비밀번호"), "12345678");
    expect(getByTestId("다음으로")).toBeDisabled(); // 비밀번호 필드만 입력했을 때 버튼 비활성화 상태
    fireEvent.changeText(getByTestId("비밀번호 확인"), "12345678");
    expect(getByTestId("다음으로")).toBeEnabled(); // 비밀번호 필드와 비밀번호 확인 필드 모두 입력했을 때 버튼 활성화 상태

    jest.spyOn(axios, "post").mockRejectedValueOnce({
      response: { data: { error: "비밀번호가 일치하지 않습니다." } },
    }); // 비밀번호 불일치 에러
    jest.spyOn(axios, "isAxiosError").mockReturnValueOnce(true);

    fireEvent.press(getByTestId("다음으로")); // 버튼 클릭
    await waitFor(() => {
      expect(getByText("비밀번호가 일치하지 않습니다.")).toBeTruthy(); // 비밀번호 불일치 에러 메시지 출력
    });
  });

  it("알 수 없는 오류", async () => {
    const { getByTestId, getByText } = renderPage();

    fireEvent.changeText(getByTestId("비밀번호"), "12345678");
    fireEvent.changeText(getByTestId("비밀번호 확인"), "12345678");

    jest.spyOn(axios, "post").mockRejectedValueOnce({}); // 비밀번호 불일치 에러
    jest.spyOn(axios, "isAxiosError").mockReturnValueOnce(false);

    fireEvent.press(getByTestId("다음으로")); // 버튼 클릭
    await waitFor(() => {
      expect(getByText("오류가 발생했습니다. 다시 시도해주세요.")).toBeTruthy(); // 알 수 없는 오류. 메시지 출력
    });
  });

  it("성공하면, 전화번호 입력 페이지로 이동", async () => {
    const { getByTestId } = renderPage();

    fireEvent.changeText(getByTestId("비밀번호"), "12345678");
    fireEvent.changeText(getByTestId("비밀번호 확인"), "12345678");

    jest.spyOn(axios, "post").mockResolvedValue({}); // 비밀번호 불일치 에러

    fireEvent.press(getByTestId("다음으로")); // 버튼 클릭
    await waitFor(() => {
      expect(Router.router.push).toHaveBeenCalledWith("/signup/phone"); // 비밀번호 확인 성공 후 다음 페이지로 이동
    });
  });
});
