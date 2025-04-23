import { fireEvent } from "@testing-library/react-native";

import { UserProfile } from "./UserProfile";
import * as AuthContext from "@contexts/auth";
import * as RegisterAPI from "@services/auth/register";
import { defaultSignupContext } from "@testdata/contexts";
import { renderWithProviders } from "@utils/test-utils";

describe("<UserProfile />", () => {
  it("handles skip correctly (social mode)", () => {
    jest.spyOn(AuthContext, "useSignup").mockReturnValue({
      ...defaultSignupContext,
      data: {
        ...defaultSignupContext.data,
        mode: "naver",
      },
    });

    const { getByTestId } = renderWithProviders(<UserProfile />);

    jest.spyOn(RegisterAPI, "register").mockResolvedValueOnce({
      status: 400,
      data: {},
    });
    fireEvent.press(getByTestId("다음에")); // fail once

    jest.spyOn(RegisterAPI, "register").mockResolvedValue({
      status: 201,
      data: {},
    });
    fireEvent.press(getByTestId("다음에")); // success
  });

  it("handles register (catchb mode)", () => {
    jest.spyOn(AuthContext, "useSignup").mockReturnValue(defaultSignupContext);

    const { getByTestId } = renderWithProviders(<UserProfile />);

    jest.spyOn(RegisterAPI, "register").mockResolvedValueOnce({
      status: 400,
      data: { error: "오류가 발생했습니다." },
    });
    fireEvent.press(getByTestId("시작하기")); // fail once with error

    jest.spyOn(RegisterAPI, "register").mockResolvedValueOnce({
      status: 400,
      data: {},
    });
    fireEvent.press(getByTestId("시작하기")); // fail once with unknown error

    jest.spyOn(RegisterAPI, "register").mockResolvedValue({
      status: 201,
      data: {},
    });
    fireEvent.press(getByTestId("시작하기")); // success
  });
});
