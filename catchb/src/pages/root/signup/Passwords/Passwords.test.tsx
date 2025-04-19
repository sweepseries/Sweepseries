import { fireEvent, waitFor } from "@testing-library/react-native";

import { Passwords } from "./Passwords";
import * as AuthAPIs from "@services/auth/register";
import { renderWithProviders } from "@utils/test-utils";

describe("<Passwords />", () => {
  it("handles check correctly", async () => {
    jest.spyOn(AuthAPIs, "checkPassword").mockResolvedValue({
      status: 204,
      data: null,
    });

    const { getByTestId } = renderWithProviders(<Passwords />);

    await waitFor(() => {
      fireEvent.changeText(
        getByTestId("영문+숫자+특수문자 조합으로 8자리 이상"),
        "test"
      );
      fireEvent.changeText(
        getByTestId("비밀번호를 다시 입력해주세요."),
        "test@email.com"
      );
      fireEvent.press(getByTestId("button"));
    });
  });

  it("handles check fail 1", async () => {
    jest.spyOn(AuthAPIs, "checkPassword").mockResolvedValue({
      status: 400,
      data: { error: "비밀번호 불일치" },
    });

    const { getByTestId } = renderWithProviders(<Passwords />);

    waitFor(() => fireEvent.press(getByTestId("button")));
  });

  it("handles check fail 2", async () => {
    jest.spyOn(AuthAPIs, "checkPassword").mockResolvedValue({
      status: 500,
      data: {},
    });

    const { getByTestId } = renderWithProviders(<Passwords />);

    waitFor(() => fireEvent.press(getByTestId("button")));
  });
});
