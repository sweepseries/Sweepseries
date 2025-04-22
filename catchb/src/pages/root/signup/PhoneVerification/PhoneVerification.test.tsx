import { fireEvent, waitFor } from "@testing-library/react-native";

import { PhoneVerification } from "./PhoneVerification";
import * as SignupContext from "@contexts/auth";
import * as RegisterAPI from "@services/auth/register";
import { defaultSignupContext } from "@testdata/contexts";
import { renderWithProviders } from "@utils/test-utils";

describe("<PhoneVerification />", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.spyOn(RegisterAPI, "requestCode").mockResolvedValue({
      status: 204,
      data: {},
    });
    jest.spyOn(RegisterAPI, "verifyCode").mockResolvedValue({
      status: 204,
      data: {},
    });
  });

  it("handles code request correctly (catchb mode)", async () => {
    const { getByTestId } = renderWithProviders(<PhoneVerification />);

    jest.spyOn(RegisterAPI, "requestCode").mockResolvedValueOnce({
      status: 500,
      data: {},
    });
    await waitFor(() => {
        fireEvent.changeText(getByTestId("middle-number"), "1234");
        fireEvent.changeText(getByTestId("last-number"), "5678");
      fireEvent.press(getByTestId("인증번호 전송")); // API Error
    });

    jest.spyOn(RegisterAPI, "requestCode").mockResolvedValueOnce({
      status: 400,
      data: { error: "유효한 전화번호가 아닙니다." },
    });
    await waitFor(() => {
      fireEvent.press(getByTestId("인증번호 전송")); // API Error with message
    });

    await waitFor(() => {
      fireEvent.press(getByTestId("인증번호 전송")); // Success
    });

    await waitFor(() => {
      expect(getByTestId("재발송 (3:00)")).toBeTruthy();
      jest.advanceTimersByTime(1000);
    });
  });

  it("handles code verification correctly (naver mode)", async () => {
    jest.spyOn(SignupContext, "useSignup").mockReturnValue({
      ...defaultSignupContext,
      data: {
        ...defaultSignupContext.data,
        mode: "naver",
      },
    });
    const { getByTestId } = renderWithProviders(<PhoneVerification />);

    // Setup: Send request
    await waitFor(() => {
      fireEvent.press(getByTestId("인증번호 전송"));
      fireEvent.changeText(getByTestId("인증번호를 입력해주세요."), "123456");
    });

    jest.spyOn(RegisterAPI, "verifyCode").mockResolvedValueOnce({
      status: 500,
      data: {},
    });
    await waitFor(() => {
      fireEvent.press(getByTestId("인증하기")); // API Error
    });

    jest.spyOn(RegisterAPI, "verifyCode").mockResolvedValueOnce({
      status: 400,
      data: { error: "유효한 인증번호가 아닙니다." },
    });
    await waitFor(() => {
      fireEvent.press(getByTestId("인증하기")); // API Error with message
    });

    await waitFor(() => {
      fireEvent.press(getByTestId("인증하기")); // Success
      fireEvent.press(getByTestId("button")); // Press Next
    });
  });
});
